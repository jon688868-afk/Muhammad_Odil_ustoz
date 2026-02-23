// ============================================
// IBXI – Imom Buxoriy ilmiy tadqiqot markazi
// XSS Prevention & HTML Sanitization Utility
// ============================================

window.IBXI = window.IBXI || {};

IBXI.Sanitize = (function () {
  'use strict';

  // ──────────────────────────────────────────
  // Configuration
  // ──────────────────────────────────────────

  var ALLOWED_TAGS = [
    'b', 'i', 'em', 'strong', 'span', 'br', 'p', 'div',
    'ul', 'ol', 'li',
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'a', 'img', 'mark', 'blockquote',
    'table', 'tr', 'td', 'th', 'thead', 'tbody'
  ];

  var ALLOWED_ATTRS = [
    'class', 'style', 'href', 'src', 'alt', 'title',
    'dir', 'id', 'role', 'tabindex',
    'aria-label', 'aria-hidden'
    // data-* attributes are handled dynamically below
  ];

  var DANGEROUS_TAGS = [
    'script', 'iframe', 'object', 'embed', 'form',
    'applet', 'base', 'link', 'meta', 'noscript',
    'style', 'template', 'math', 'svg'
  ];

  var SAFE_URL_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

  // ──────────────────────────────────────────
  // HTML entity map for escapeHTML
  // ──────────────────────────────────────────

  var HTML_ESCAPE_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  var HTML_ESCAPE_RE = /[&<>"'/]/g;

  // ──────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────

  /**
   * Check whether a string is a valid data-* attribute name.
   * Must start with "data-" followed by at least one character
   * containing only lowercase letters, digits, and hyphens.
   */
  function isDataAttribute(name) {
    return /^data-[a-z][a-z0-9-]*$/.test(name);
  }

  /**
   * Check whether an attribute name is an event handler.
   * Covers onclick, onload, onerror, onmouseover, etc.
   */
  function isEventHandler(name) {
    return /^on[a-z]/i.test(name);
  }

  /**
   * Check whether a URL string uses a dangerous protocol.
   * Returns true if the URL is safe, false otherwise.
   */
  function isSafeURL(url) {
    if (typeof url !== 'string') return false;

    var trimmed = url.replace(/[\s\u0000-\u001F\u007F-\u009F]+/g, '').trim();

    // Empty URLs and fragment-only URLs are safe
    if (trimmed === '' || trimmed.charAt(0) === '#') return true;

    // Relative URLs (no protocol) are safe
    if (trimmed.charAt(0) === '/' || trimmed.charAt(0) === '.') return true;

    // Decode any HTML entities that might disguise the protocol
    var decoded = decodeHTMLEntities(trimmed);

    // Normalize for protocol detection: collapse whitespace, lowercase
    var normalized = decoded.replace(/[\s\u0000-\u001F\u007F-\u009F]+/g, '').toLowerCase();

    // Check for javascript:, vbscript:, data: and other dangerous protocols
    if (/^(?:javascript|vbscript|data|mhtml):/i.test(normalized)) return false;

    // If it has an explicit protocol, make sure it is whitelisted
    var protocolMatch = normalized.match(/^([a-z][a-z0-9+.-]*:)/);
    if (protocolMatch) {
      var protocol = protocolMatch[1];
      return SAFE_URL_PROTOCOLS.indexOf(protocol) !== -1;
    }

    // No explicit protocol — treat as relative (safe)
    return true;
  }

  /**
   * Decode HTML entities in a string (for URL protocol analysis).
   */
  function decodeHTMLEntities(str) {
    var textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
  }

  /**
   * Create a lookup object from an array for O(1) membership checks.
   */
  function arrayToMap(arr) {
    var map = {};
    for (var i = 0; i < arr.length; i++) {
      map[arr[i].toLowerCase()] = true;
    }
    return map;
  }

  var ALLOWED_TAGS_MAP = arrayToMap(ALLOWED_TAGS);
  var DANGEROUS_TAGS_MAP = arrayToMap(DANGEROUS_TAGS);
  var ALLOWED_ATTRS_MAP = arrayToMap(ALLOWED_ATTRS);

  // ──────────────────────────────────────────
  // 1. escapeHTML(str)
  // ──────────────────────────────────────────

  /**
   * Escape HTML special characters in a string to prevent XSS
   * when inserting untrusted text into HTML contexts.
   *
   * @param  {string} str  The input string to escape.
   * @return {string}      The escaped string. Returns '' for non-string input.
   */
  function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(HTML_ESCAPE_RE, function (ch) {
      return HTML_ESCAPE_MAP[ch];
    });
  }

  // ──────────────────────────────────────────
  // 2. sanitizeHTML(html)
  // ──────────────────────────────────────────

  /**
   * Walk a DOM tree and produce a clean document fragment containing
   * only whitelisted tags and attributes.
   *
   * @param  {Node}             sourceNode  The node to walk.
   * @param  {DocumentFragment} targetParent The parent to append clean nodes to.
   */
  function walkAndClean(sourceNode, targetParent) {
    var children = sourceNode.childNodes;

    for (var i = 0; i < children.length; i++) {
      var child = children[i];

      // Text nodes: keep them as-is (the DOM will handle encoding)
      if (child.nodeType === Node.TEXT_NODE) {
        targetParent.appendChild(document.createTextNode(child.textContent));
        continue;
      }

      // Comment nodes: skip entirely
      if (child.nodeType === Node.COMMENT_NODE) {
        continue;
      }

      // Element nodes
      if (child.nodeType === Node.ELEMENT_NODE) {
        var tagName = child.tagName.toLowerCase();

        // Dangerous tags: remove completely (including all children)
        if (DANGEROUS_TAGS_MAP[tagName]) {
          continue;
        }

        // Allowed tags: clone the element, filter attributes, recurse
        if (ALLOWED_TAGS_MAP[tagName]) {
          var cleanEl = document.createElement(tagName);

          // Filter attributes
          var attrs = child.attributes;
          for (var j = 0; j < attrs.length; j++) {
            var attrName = attrs[j].name.toLowerCase();
            var attrValue = attrs[j].value;

            // Skip event handlers unconditionally
            if (isEventHandler(attrName)) continue;

            // Check if attribute is allowed (including data-* attributes)
            var isAllowed = ALLOWED_ATTRS_MAP[attrName] || isDataAttribute(attrName);
            if (!isAllowed) continue;

            // For href and src, validate the URL protocol
            if (attrName === 'href' || attrName === 'src') {
              if (!isSafeURL(attrValue)) continue;
            }

            // Sanitize style attribute to prevent expression-based XSS
            if (attrName === 'style') {
              attrValue = sanitizeStyleValue(attrValue);
              if (attrValue === '') continue;
            }

            cleanEl.setAttribute(attrName, attrValue);
          }

          // Recurse into children
          walkAndClean(child, cleanEl);

          targetParent.appendChild(cleanEl);
        } else {
          // Unknown/disallowed tag: unwrap (keep children, remove the tag itself)
          walkAndClean(child, targetParent);
        }
      }
    }
  }

  /**
   * Sanitize a CSS style attribute value.
   * Removes expressions, url(), and other potentially dangerous constructs.
   *
   * @param  {string} style  The raw style attribute value.
   * @return {string}        The sanitized style value.
   */
  function sanitizeStyleValue(style) {
    if (typeof style !== 'string') return '';

    // Remove CSS expressions (IE), url(), -moz-binding, behavior, etc.
    var dangerous = /expression\s*\(|url\s*\(|javascript\s*:|@import|behavior\s*:|binding\s*:|-moz-binding/gi;
    var cleaned = style.replace(dangerous, '');

    // If we removed something, discard the entire style to be safe
    if (cleaned !== style) return '';

    return style;
  }

  /**
   * Sanitize an HTML string, allowing only safe tags and attributes.
   * Uses a DOM-based approach for reliable parsing.
   *
   * @param  {string} html  The untrusted HTML string to sanitize.
   * @return {string}       The sanitized HTML string.
   */
  function sanitizeHTML(html) {
    if (typeof html !== 'string') return '';
    if (html === '') return '';

    // Parse the HTML string into a DOM tree using a template element
    // (template contents are inert — scripts won't execute)
    var template = document.createElement('template');
    template.innerHTML = html;

    // Create a clean document fragment
    var fragment = document.createDocumentFragment();

    // Walk the parsed tree and build the clean version
    walkAndClean(template.content, fragment);

    // Serialize the clean fragment back to an HTML string
    var wrapper = document.createElement('div');
    wrapper.appendChild(fragment);
    return wrapper.innerHTML;
  }

  // ──────────────────────────────────────────
  // 3. escapeAttr(str)
  // ──────────────────────────────────────────

  /**
   * Escape a string for safe use inside an HTML attribute value.
   * This is more aggressive than escapeHTML — it also escapes
   * backticks and additional characters that could break out of
   * attribute contexts.
   *
   * @param  {string} str  The input string.
   * @return {string}      The escaped string safe for attribute use.
   */
  function escapeAttr(str) {
    if (typeof str !== 'string') return '';

    return str
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/`/g, '&#96;')
      .replace(/\//g, '&#x2F;');
  }

  // ──────────────────────────────────────────
  // 4. stripTags(str)
  // ──────────────────────────────────────────

  /**
   * Remove all HTML tags from a string, returning only the text content.
   * Uses the DOM to reliably extract text even from nested/malformed HTML.
   *
   * @param  {string} str  The input string possibly containing HTML.
   * @return {string}      Plain text with all tags removed.
   */
  function stripTags(str) {
    if (typeof str !== 'string') return '';
    if (str === '') return '';

    // Use a template element to safely parse without executing scripts
    var template = document.createElement('template');
    template.innerHTML = str;
    return template.content.textContent || '';
  }

  // ──────────────────────────────────────────
  // 5. sanitizeURL(url)
  // ──────────────────────────────────────────

  /**
   * Validate and sanitize a URL. Only allows http:, https:, mailto:,
   * and tel: protocols. Returns an empty string for dangerous URLs.
   *
   * @param  {string} url  The URL to validate.
   * @return {string}      The sanitized URL, or '' if invalid/dangerous.
   */
  function sanitizeURL(url) {
    if (typeof url !== 'string') return '';

    var trimmed = url.trim();
    if (trimmed === '') return '';

    // Strip null bytes and control characters
    trimmed = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]+/g, '');

    // Decode HTML entities to catch obfuscation attempts
    var decoded = decodeHTMLEntities(trimmed);

    // Collapse whitespace for protocol analysis
    var normalized = decoded.replace(/\s+/g, '').toLowerCase();

    // Block dangerous protocols
    if (/^(?:javascript|vbscript|data|mhtml|blob):/i.test(normalized)) {
      return '';
    }

    // If it has a protocol, it must be in our safe list
    var protocolMatch = normalized.match(/^([a-z][a-z0-9+.-]*:)/);
    if (protocolMatch) {
      var protocol = protocolMatch[1];
      if (SAFE_URL_PROTOCOLS.indexOf(protocol) === -1) {
        return '';
      }
    }

    // Return the trimmed (but not decoded/lowercased) version
    return trimmed;
  }

  // ──────────────────────────────────────────
  // Public API
  // ──────────────────────────────────────────

  return {
    escapeHTML:    escapeHTML,
    sanitizeHTML:  sanitizeHTML,
    escapeAttr:    escapeAttr,
    stripTags:     stripTags,
    sanitizeURL:   sanitizeURL
  };

})();
