/* PureCare Cleaning Services — Part 3 functionality */
'use strict';

const BUSINESS_EMAIL = 'purecarecleaning@gmail.com';

/* Dynamic service catalogue: content is created from this JavaScript data. */
const services = [
  { name: 'Regular Home Cleaning', category: 'Residential', description: 'Routine cleaning for homes and living spaces.' },
  { name: 'Deep Cleaning', category: 'Residential', description: 'A detailed clean for rooms and surfaces that need extra attention.' },
  { name: 'Move-in / Move-out Cleaning', category: 'Residential', description: 'Cleaning before moving into or leaving a property.' },
  { name: 'Office Cleaning', category: 'Commercial', description: 'Cleaning support for offices and professional workspaces.' },
  { name: 'Small Business Premises', category: 'Commercial', description: 'Routine cleaning for small commercial environments.' },
  { name: 'Carpet and Upholstery Cleaning', category: 'Specialised', description: 'Detailed cleaning for carpets and upholstered surfaces.' },
  { name: 'Post-renovation Cleaning', category: 'Specialised', description: 'Cleaning after building, renovation or improvement work.' }
];

// Build one service card safely with DOM methods instead of injecting HTML strings.
function createServiceCard(service) {
  const article = document.createElement('article');
  article.className = 'service-box';

  const category = document.createElement('p');
  category.className = 'service-category';
  category.textContent = service.category;

  const heading = document.createElement('h3');
  heading.textContent = service.name;

  const description = document.createElement('p');
  description.textContent = service.description;

  const link = document.createElement('a');
  link.className = 'text-link';
  link.href = `enquiry.html?service=${encodeURIComponent(service.name)}`;
  link.textContent = 'Enquire about this service';

  article.append(category, heading, description, link);
  return article;
}

// Only initialise the catalogue on pages that contain its target container.
const servicesList = document.querySelector('#services-list');
if (servicesList) {
  const searchInput = document.querySelector('#service-search');
  const sortSelect = document.querySelector('#service-sort');
  const status = document.querySelector('#service-search-status');

  function renderServices() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const sortMode = sortSelect?.value || 'recommended';
    let results = services.filter((service) =>
      `${service.name} ${service.category} ${service.description}`.toLowerCase().includes(query)
    );

    if (sortMode === 'name-asc') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === 'name-desc') {
      results.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortMode === 'category') {
      results.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));
    }

    servicesList.replaceChildren(...results.map(createServiceCard));
    if (status) {
      status.textContent = query
        ? `${results.length} service${results.length === 1 ? '' : 's'} found.`
        : `${results.length} services available.`;
    }
  }

  searchInput?.addEventListener('input', renderServices);
  sortSelect?.addEventListener('change', renderServices);
  renderServices();
}

/* Accessible inline validation shared by both forms. */
// Convert browser constraint-validation states into clear, user-friendly messages.
function validationMessage(field) {
  const validity = field.validity;
  if (validity.valueMissing) return 'This field is required.';
  if (validity.typeMismatch && field.type === 'email') return 'Enter a valid email address.';
  if (validity.patternMismatch && field.type === 'tel') return 'Enter a South African number: 0 followed by 9 digits, or +27 followed by 9 digits. Spaces and hyphens are allowed.';
  if (validity.tooShort) return `Please enter at least ${field.minLength} characters.`;
  if (validity.tooLong) return `Please use no more than ${field.maxLength} characters.`;
  if (validity.rangeUnderflow) return 'Choose today or a future date.';
  if (validity.badInput) return 'Please enter a valid value.';
  return 'Please check this field.';
}

// Create or connect inline error elements and update them as visitors interact with fields.
function prepareInlineErrors(form) {
  const fields = [...form.querySelectorAll('input, select, textarea')];
  fields.forEach((field) => {
    const errorId = `${field.id || field.name}-error`;
    let error = form.querySelector(`#${CSS.escape(errorId)}`);
    if (!error) {
      error = document.createElement('span');
      error.id = errorId;
      error.className = 'field-error';
      error.hidden = true;
      field.insertAdjacentElement('afterend', error);
    }
    const describedBy = (field.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean);
    if (!describedBy.includes(errorId)) describedBy.push(errorId);
    field.setAttribute('aria-describedby', describedBy.join(' '));

    field.addEventListener('blur', () => {
      field.dataset.touched = 'true';
      updateFieldError(field, error);
    });
    field.addEventListener('input', () => {
      if (field.dataset.touched === 'true') updateFieldError(field, error);
    });
    field.addEventListener('change', () => {
      if (field.dataset.touched === 'true') updateFieldError(field, error);
    });
  });
  return fields;
}

// Keep the visible message and accessibility attributes in sync with the field validity.
function updateFieldError(field, error) {
  const message = field.validity.valid ? '' : validationMessage(field);
  error.textContent = message;
  error.hidden = !message;
  field.setAttribute('aria-invalid', message ? 'true' : 'false');
  return !message;
}

// Validate every field, show a summary, and focus the first invalid field.
function validateForm(form, fields) {
  let firstInvalid = null;
  let errorCount = 0;

  fields.forEach((field) => {
    field.dataset.touched = 'true';
    const error = form.querySelector(`#${CSS.escape(`${field.id || field.name}-error`)}`);
    if (!updateFieldError(field, error)) {
      errorCount += 1;
      if (!firstInvalid) firstInvalid = field;
    }
  });

  const summary = form.querySelector('#form-errors');
  if (summary) {
    summary.hidden = errorCount === 0;
    summary.textContent = errorCount
      ? `Please correct ${errorCount} highlighted field${errorCount === 1 ? '' : 's'} before submitting.`
      : '';
  }

  if (firstInvalid) {
    firstInvalid.focus();
    return false;
  }
  return true;
}

function showFormResult(element, message, isError = false) {
  if (!element) return;
  element.hidden = false;
  element.textContent = message;
  element.classList.toggle('error-message', isError);
  element.classList.toggle('success-message', !isError);
}

/* Submit a validated form to Formspree without opening the visitor's email app. */
// Send a validated form with Fetch API; show progress, success or failure without a page reload.
async function submitToFormspree(form, resultElement, successMessage) {
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.textContent : '';

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
  }
  if (resultElement) {
    resultElement.hidden = true;
    resultElement.textContent = '';
  }

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const detail = Array.isArray(data.errors)
        ? data.errors.map((item) => item.message).join(' ')
        : '';
      throw new Error(detail || 'Your message could not be sent. Please try again.');
    }

    form.reset();
    form.querySelectorAll('input, select, textarea').forEach((field) => {
      field.dataset.touched = 'false';
      field.removeAttribute('aria-invalid');
      const error = form.querySelector(`#${CSS.escape(`${field.id || field.name}-error`)}`);
      if (error) {
        error.textContent = '';
        error.hidden = true;
      }
    });
    const summary = form.querySelector('#form-errors');
    if (summary) {
      summary.hidden = true;
      summary.textContent = '';
    }
    showFormResult(resultElement, successMessage);
  } catch (error) {
    showFormResult(
      resultElement,
      `${error.message} Check your internet connection or contact PureCare directly at purecarecleaning@gmail.com.`,
      true
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalButtonText;
    }
  }
}

function setMinimumDate(dateField) {
  if (!dateField) return;
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
    .toISOString().slice(0, 10);
  dateField.min = localDate;
}

// Enquiry form: validate required details, then send the request to its dedicated Formspree endpoint.
const enquiryForm = document.querySelector('#service-enquiry');
if (enquiryForm) {
  const fields = prepareInlineErrors(enquiryForm);
  const dateField = enquiryForm.querySelector('#date');
  setMinimumDate(dateField);

  // Allow a service link from the catalogue to preselect the enquiry form.
  const requestedService = new URLSearchParams(window.location.search).get('service');
  const serviceSelect = enquiryForm.querySelector('#service');
  if (requestedService && serviceSelect) {
    const matchingOption = [...serviceSelect.options].find((option) => option.text.trim() === requestedService);
    if (matchingOption) serviceSelect.value = matchingOption.value;
  }

  enquiryForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm(enquiryForm, fields)) return;

    const values = Object.fromEntries(new FormData(enquiryForm).entries());
    const result = document.querySelector('#enquiry-result');
    const reply = `Thank you, ${values.name}. Your ${values.service} enquiry for ${values.area} has been sent to PureCare. Your preferred date is ${values.date}; this is a request, not a confirmed booking. Our team will review your property type and cleaning requirements, then contact you to confirm availability and provide a quote. The final cost depends on the size and condition of the space and the work required.`;

    await submitToFormspree(enquiryForm, result, reply);
  });
}

// Contact form: validate the general message and submit it to the separate contact endpoint.
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  const fields = prepareInlineErrors(contactForm);
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!validateForm(contactForm, fields)) return;

    const values = Object.fromEntries(new FormData(contactForm).entries());
    await submitToFormspree(
      contactForm,
      document.querySelector('#contact-result'),
      `Thank you, ${values.name}. Your message has been sent successfully to PureCare. We will get back to you as soon as possible.`
    );
  });
}

// Initialise the service-area map only when the contact page includes the map element.
/* Leaflet map: service areas are approximate area-centre markers, not office addresses. */
const mapElement = document.querySelector('#service-map');
if (mapElement && window.L) {
  const map = L.map(mapElement, { scrollWheelZoom: false }).setView([-26.075, 28.09], 11);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
  }).addTo(map);

  const areas = [
    { name: 'Sandton', coordinates: [-26.1076, 28.0567] },
    { name: 'Midrand', coordinates: [-25.9992, 28.1263] },
    { name: 'Rosebank', coordinates: [-26.1457, 28.0436] }
  ];
  const markers = areas.map((area) =>
    L.marker(area.coordinates).addTo(map)
      .bindPopup(`<strong>${area.name}</strong><br>PureCare service area`)
  );
  map.fitBounds(L.latLngBounds(areas.map((area) => area.coordinates)), { padding: [35, 35] });
  markers[0].openPopup();
} else if (mapElement) {
  mapElement.textContent = 'The interactive map could not load. Please use the service-area list below.';
}

/* Gallery lightbox with keyboard and button navigation. */
const galleryDialog = document.querySelector('#gallery-dialog');
if (galleryDialog) {
  const triggers = [...document.querySelectorAll('.gallery-trigger')];
  const image = document.querySelector('#gallery-dialog-image');
  let activeImage = 0;

  function showGalleryImage(index) {
    if (!triggers.length || !image) return;
    activeImage = (index + triggers.length) % triggers.length;
    image.src = triggers[activeImage].dataset.gallerySrc;
    image.alt = triggers[activeImage].dataset.galleryAlt || 'PureCare cleaning gallery image';
  }

  triggers.forEach((trigger, index) => {
    trigger.addEventListener('click', () => {
      showGalleryImage(index);
      if (typeof galleryDialog.showModal === 'function') galleryDialog.showModal();
      else galleryDialog.setAttribute('open', '');
    });
  });

  galleryDialog.querySelector('[data-gallery-close]')?.addEventListener('click', () => galleryDialog.close());
  galleryDialog.querySelector('[data-gallery-prev]')?.addEventListener('click', () => showGalleryImage(activeImage - 1));
  galleryDialog.querySelector('[data-gallery-next]')?.addEventListener('click', () => showGalleryImage(activeImage + 1));

  galleryDialog.addEventListener('click', (event) => {
    if (event.target === galleryDialog) galleryDialog.close();
  });
  galleryDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') showGalleryImage(activeImage - 1);
    if (event.key === 'ArrowRight') showGalleryImage(activeImage + 1);
  });
}
