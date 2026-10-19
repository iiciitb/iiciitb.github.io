/* IIC IIT Bombay - public site interactivity
 * Vanilla JS, no dependencies.
 * - Mobile menu toggle
 * - Active nav link
 * - Dynamic footer year
 * - Reveal-on-scroll
 * - Get Help form via mailto (with CCs)
 * - Contact form via mailto (with CCs)
 */
(function () {
  'use strict';

  // ---- Mobile menu toggle ----
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Active nav link based on path ----
  var path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === path || (path === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });

  // ---- Dynamic footer year ----
  document.querySelectorAll('[data-current-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- Helper: build a mailto URL with subject + body + cc ----
  var CC_LIST = 'p11390@iitb.ac.in,prakhar.agrahari@iitb.ac.in';
  function buildMailto(to, subject, body) {
    return 'mailto:' + to +
      '?cc=' + encodeURIComponent(CC_LIST) +
      '&subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }

  // ---- Get Help form -> mailto:iic@iitb.ac.in (cc: p11390, prakhar.agrahari) ----
  var helpForm = document.getElementById('help-request-form');
  if (helpForm) {
    helpForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(helpForm);
      var helpTypes = [];
      helpForm.querySelectorAll('input[name="help_types"]:checked').forEach(function (el) {
        helpTypes.push(el.value);
      });
      var lines = [
        'Name:        ' + (fd.get('name') || ''),
        'IITB email:  ' + (fd.get('email') || ''),
        'Roll number: ' + (fd.get('roll') || '(not provided)'),
        'Department:  ' + (fd.get('department') || ''),
        'Year:        ' + (fd.get('year') || ''),
        'Best channel: ' + (fd.get('channel') || 'email'),
        '',
        'Help needed: ' + (helpTypes.length ? helpTypes.join(', ') : '(not specified)'),
        '',
        'What I am working on:',
        fd.get('description') || '',
        '',
        'Additional notes:',
        fd.get('notes') || '(none)'
      ];
      var subject = 'Help request from ' + (fd.get('name') || 'student') +
                    (fd.get('department') ? ' (' + fd.get('department') + ')' : '');
      var url = buildMailto('iic@iitb.ac.in', subject, lines.join('\n'));
      window.location.href = url;

      var successEl = document.getElementById('help-form-success');
      if (successEl) {
        successEl.style.display = 'flex';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { successEl.style.display = 'none'; }, 12000);
      }
      helpForm.reset();
    });
  }

  // ---- Contact form -> mailto:iic@iitb.ac.in (cc: p11390, prakhar.agrahari) ----
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(contactForm);
      var lines = [
        'Name:        ' + (fd.get('name') || ''),
        'Email:       ' + (fd.get('email') || ''),
        'Affiliation: ' + (fd.get('affiliation') || ''),
        'Type:        ' + (fd.get('type') || ''),
        '',
        'Message:',
        fd.get('message') || ''
      ];
      var subject = '[' + (fd.get('type') || 'Message') + '] from ' + (fd.get('name') || 'visitor');
      var url = buildMailto('iic@iitb.ac.in', subject, lines.join('\n'));
      window.location.href = url;

      var successEl = document.getElementById('contact-form-success');
      if (successEl) {
        successEl.style.display = 'flex';
        successEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(function () { successEl.style.display = 'none'; }, 12000);
      }
      contactForm.reset();
    });
  }

  // ---- Reveal on scroll ----
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
