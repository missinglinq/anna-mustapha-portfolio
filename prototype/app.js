const cases = [
  {
    id: 'PT-1042',
    address: '1432 Cypress Ave',
    parcel: '41000001',
    owner: 'Jordan Ellis',
    status: 'Targeted delta',
    confidence: 72,
    conflict: 'J. Ellis Estate',
    permit: 'Renovation',
    codes: '1 active / 2 prior',
    tax: 'No signal',
    mva: 'Official benchmark context',
    route: 'review',
    assessor: 'Jordan Ellis',
    assessorNote: 'Supporting signal',
    permitOwner: 'Jordan A. Ellis',
    permitOwnerNote: 'Likely entity match',
    taxOwner: 'Jordan Ellis',
    taxOwnerNote: 'Supporting signal',
    mismatchCount: '1 mismatch',
    conflictNote: 'Possible conflict • verify',
    nextStep: 'Do not auto-reuse. Ask a researcher to inspect the source and determine whether additional research is required.',
    reviewTag: 'Identity conflict',
    reviewConflict: 'Estate reference conflicts with the prior verified identity and supporting systems.',
    record: {
      label: 'SIMULATED HISTORICAL RECORD',
      title: 'ACT OF TRANSFER',
      snippet: '... property described as Lot 17, Square 204 ...',
      party: 'J. Ellis Estate',
      reference: 'Recordation reference: synthetic example',
      confidence: '87%',
      partyConfidence: '72% • verify',
      property: 'Lot 17, Square 204',
      propertyConfidence: '94%',
      type: 'Transfer-related',
      typeConfidence: '81%'
    }
  },
  {
    id: 'PT-1043',
    address: '908 Magnolia St',
    parcel: '41000028',
    owner: 'Lena Baptiste',
    status: 'Targeted delta',
    confidence: 81,
    conflict: 'Assessor mismatch after sale signal',
    permit: 'None',
    codes: '1 active / 1 prior',
    tax: 'Current',
    mva: 'Official benchmark context',
    route: 'review',
    assessor: 'Elise Baptiste',
    assessorNote: 'Possible post-sale mismatch',
    permitOwner: 'Lena Baptiste',
    permitOwnerNote: 'Prior supporting signal',
    taxOwner: 'Lena Baptiste',
    taxOwnerNote: 'Current account signal',
    mismatchCount: '1 mismatch',
    conflictNote: 'Assessor identity differs • verify',
    nextStep: 'Review the recorded-sale signal and the assessor identity before deciding whether the prior baseline can be reused.',
    reviewTag: 'Ownership mismatch',
    reviewConflict: 'A sale-related signal and assessor identity do not align with the prior verified owner.',
    record: {
      label: 'SIMULATED SALE-RELATED RECORD',
      title: 'NOTICE OF TRANSFER SIGNAL',
      snippet: '... transfer-related record associated with 908 Magnolia St ...',
      party: 'Elise Baptiste',
      reference: 'Reference: synthetic example',
      confidence: '89%',
      partyConfidence: '81% • verify',
      property: '908 Magnolia St',
      propertyConfidence: '96%',
      type: 'Sale-related',
      typeConfidence: '88%'
    }
  },
  {
    id: 'PT-1044',
    address: '2710 Laurel Rd',
    parcel: '41000144',
    owner: 'Succession of R. Carter',
    status: 'Manual review',
    confidence: 46,
    conflict: 'Succession + multiple possible heirs',
    permit: 'Roof permit',
    codes: '2 active / 3 prior',
    tax: 'Delinquency signal',
    mva: 'Official benchmark context',
    route: 'manual',
    assessor: 'R. Carter Estate',
    assessorNote: 'Estate reference',
    permitOwner: 'R. Carter',
    permitOwnerNote: 'Historical identity only',
    taxOwner: 'Succession of R. Carter',
    taxOwnerNote: 'Delinquency signal attached',
    mismatchCount: '3 unresolved signals',
    conflictNote: 'Complex chain • manual review',
    nextStep: 'Do not rely on automated reconciliation. Route the case to a specialist for succession, heir, identity, and chain review.',
    reviewTag: 'Complex chain',
    reviewConflict: 'Succession and multiple possible heirs make automated reuse inappropriate.',
    record: {
      label: 'SIMULATED SUCCESSION RECORD',
      title: 'SUCCESSION-RELATED FILING',
      snippet: '... possible heirs and estate interests require additional review ...',
      party: 'Succession of R. Carter',
      reference: 'Reference: synthetic example',
      confidence: '61%',
      partyConfidence: '46% • manual review',
      property: '2710 Laurel Rd',
      propertyConfidence: '92%',
      type: 'Succession-related',
      typeConfidence: '68%'
    }
  },
  {
    id: 'PT-1045',
    address: '624 Dumaine St',
    parcel: '41000175',
    owner: 'Marisol Nguyen',
    status: 'Reuse + verify',
    confidence: 93,
    conflict: 'No material change signal',
    permit: 'Electrical',
    codes: '1 active / 0 prior',
    tax: 'Current',
    mva: 'Official benchmark context',
    route: 'reuse',
    assessor: 'Marisol Nguyen',
    assessorNote: 'Aligned supporting signal',
    permitOwner: 'Marisol Nguyen',
    permitOwnerNote: 'Aligned supporting signal',
    taxOwner: 'Marisol Nguyen',
    taxOwnerNote: 'Aligned supporting signal',
    mismatchCount: '0 material conflicts',
    conflictNote: 'No material conflict detected',
    nextStep: 'Reuse the prior verified baseline only after a researcher confirms the delta review and records that decision.',
    reviewTag: 'Delta verification',
    reviewConflict: 'No material ownership-change signal was found; human confirmation is still required before reuse.',
    record: {
      label: 'SIMULATED CURRENT RECORD',
      title: 'CURRENT SUPPORTING RECORD',
      snippet: '... no material ownership-change signal identified in this synthetic example ...',
      party: 'Marisol Nguyen',
      reference: 'Reference: synthetic example',
      confidence: '96%',
      partyConfidence: '93% • aligned',
      property: '624 Dumaine St',
      propertyConfidence: '97%',
      type: 'Supporting record',
      typeConfidence: '94%'
    }
  }
];

const viewNames = {
  command: 'Research Queue',
  property: 'Property 360',
  records: 'Record Intelligence',
  market: 'Market Context',
  review: 'Human Review'
};

let current = cases[0];
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];

function toast(message) {
  const element = document.createElement('div');
  element.className = 'toast';
  element.setAttribute('role', 'status');
  element.textContent = message;
  document.body.appendChild(element);
  window.setTimeout(() => element.remove(), 2300);
}

function showTraceState(label, onComplete) {
  const existing = $('.trace-loader');
  if (existing) existing.remove();

  const overlay = document.createElement('div');
  overlay.className = 'trace-loader';
  overlay.setAttribute('role', 'status');
  overlay.setAttribute('aria-live', 'polite');
  overlay.innerHTML = `
    <div class="trace-mark" aria-hidden="true">
      <svg viewBox="0 0 80 64">
        <path class="roof" d="M10 31 L40 8 L70 31"/>
        <path class="house" d="M18 27 V56 H62 V27"/>
        <path class="door" d="M34 56 V39 H47 V56"/>
        <path class="trail" d="M4 60 C20 48 23 63 38 56 C50 50 60 57 76 45"/>
      </svg>
    </div>
    <b>${label}</b>
    <span>Concept interaction — no live property records are being queried.</span>`;

  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('show'));

  window.setTimeout(() => {
    overlay.classList.add('done');
    window.setTimeout(() => {
      overlay.remove();
      onComplete?.();
    }, 180);
  }, 420);
}

function showRabbit(target) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const rabbit = document.createElement('span');
  rabbit.className = 'white-rabbit';
  rabbit.setAttribute('aria-hidden', 'true');
  rabbit.textContent = '🐇';
  document.body.appendChild(rabbit);

  const box = target.getBoundingClientRect();
  rabbit.style.left = `${Math.max(10, box.left - 28)}px`;
  rabbit.style.top = `${box.top + window.scrollY + box.height / 2 - 12}px`;
  requestAnimationFrame(() => rabbit.classList.add('hop'));
  window.setTimeout(() => rabbit.remove(), 900);
}

function go(view) {
  $$('.view').forEach(element => element.classList.remove('active'));
  $(`#${view}`).classList.add('active');
  $$('[data-v]').forEach(element => element.classList.toggle('active', element.dataset.v === view));
  $('#title').textContent = viewNames[view];
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function routeClass(item) {
  return item.route === 'manual' ? 'red' : item.route === 'reuse' ? 'green' : 'gold';
}

function confidenceClass(item) {
  return item.confidence < 60 ? 'red' : item.confidence < 85 ? 'amber' : 'green';
}

function openCase(caseId) {
  current = cases.find(item => item.id === caseId) || current;
  renderCurrentCase();
  showTraceState('Tracing this property…', () => go('property'));
}

function renderQueue(list = cases) {
  const body = $('#queueBody');
  body.innerHTML = list.map(item => `
    <tr data-case="${item.id}" role="button" tabindex="0" aria-label="Open ${item.address}">
      <td><b>${item.address}</b><small>${item.id} • Parcel ${item.parcel}</small></td>
      <td>${item.conflict}</td>
      <td><span class="pill ${confidenceClass(item)}">${item.confidence}%</span></td>
      <td>${item.route === 'manual' ? 'Complex researcher / counsel' : item.route === 'reuse' ? 'Verify delta + approve' : 'Validate source + parties'}</td>
      <td><span class="pill ${routeClass(item)}">${item.status}</span></td>
    </tr>`).join('');

  $$('#queueBody tr').forEach(row => {
    row.addEventListener('click', () => openCase(row.dataset.case));
    row.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCase(row.dataset.case);
      }
    });
  });
}

function renderCurrentCase() {
  renderProperty();
  renderRecord();
  renderReview();
}

function renderProperty() {
  $('#propertyAddress').textContent = current.address;
  $('#propertyParcel').textContent = `Parcel ${current.parcel} • ${current.id}`;
  $('#baselineOwner').textContent = current.owner;
  $('#assessorOwner').textContent = current.assessor;
  $('#assessorNote').textContent = current.assessorNote;
  $('#permitOwner').textContent = current.permitOwner;
  $('#permitOwnerNote').textContent = current.permitOwnerNote;
  $('#taxOwner').textContent = current.taxOwner;
  $('#taxOwnerNote').textContent = current.taxOwnerNote;
  $('#conflictOwner').textContent = current.conflict;
  $('#conflictNote').textContent = current.conflictNote;
  $('#permitVal').textContent = current.permit;
  $('#codeVal').textContent = current.codes;
  $('#taxVal').textContent = current.tax;
  $('#mvaVal').textContent = current.mva;
  $('#mismatchBadge').textContent = current.mismatchCount;
  $('#mismatchBadge').className = `pill ${current.route === 'manual' ? 'red' : current.route === 'reuse' ? 'green' : 'amber'}`;
  $('#newDocRow').classList.toggle('mismatch', current.route !== 'reuse');
  $('#alignmentVal').textContent = current.route === 'reuse' ? '5 of 5 agree' : current.route === 'manual' ? '2 of 5 agree' : '4 of 5 agree';
  $('#alignmentNote').textContent = current.route === 'reuse' ? 'No material conflict' : 'Human review required';
  $('#briefText').textContent = current.route === 'reuse'
    ? `ParcelTrace found no material ownership-change signal after the last verified baseline for ${current.address}. Supporting systems align, but a researcher still confirms the delta before reuse.`
    : `ParcelTrace detected a change or identity signal for ${current.address}: ${current.conflict}. The system does not treat this as a title conclusion.`;
  $('#nextStep').textContent = current.nextStep;
  $('#routeBadge').textContent = current.status;
  $('#routeBadge').className = `pill ${routeClass(current)}`;
  $('#resolve').textContent = current.route === 'manual'
    ? 'Send case to specialist review'
    : current.route === 'reuse'
      ? 'Send delta for verification'
      : 'Send conflict to researcher';
}

function renderRecord() {
  const record = current.record;
  $('#recordLabel').textContent = record.label;
  $('#recordTitle').textContent = record.title;
  $('#recordSnippet').textContent = record.snippet;
  $('#recordPartyScript').textContent = record.party;
  $('#recordReference').textContent = record.reference;
  $('#recordConfidence').textContent = record.confidence;
  $('#recordParty').textContent = record.party;
  $('#recordPartyConfidence').textContent = record.partyConfidence;
  $('#recordProperty').textContent = record.property;
  $('#recordPropertyConfidence').textContent = record.propertyConfidence;
  $('#recordType').textContent = record.type;
  $('#recordTypeConfidence').textContent = record.typeConfidence;
}

function renderReview() {
  $('#reviewTag').textContent = current.reviewTag;
  $('#reviewTag').className = `pill ${current.route === 'manual' ? 'red' : current.route === 'reuse' ? 'green' : 'amber'}`;
  $('#reviewAddress').textContent = current.address;
  $('#reviewConflict').textContent = current.reviewConflict;
  $('#reviewState').dataset.state = 'pending';
  $('#reviewStatus').textContent = 'Awaiting researcher decision';
  $('#auditLog').innerHTML = `<b>Latest activity</b><p>${current.id} — Evidence review is ready for a human decision.</p>`;
}

function updateReviewState(state) {
  $('#reviewState').dataset.state = state;
  $('#reviewStatus').textContent = state === 'approved' ? 'Approved by researcher' : 'Returned for more research';

  const action = state === 'approved'
    ? `Researcher approved the ${current.status.toLowerCase()} decision for ${current.address}.`
    : `Researcher rejected the recommendation for ${current.address} and requested additional research.`;

  $('#auditLog').innerHTML = `<b>Latest activity</b><p>${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} — ${action}</p>`;
  toast(state === 'approved' ? 'Human approval recorded in prototype audit log.' : 'Case returned for additional research.');
}

$$('[data-v]').forEach(element => element.addEventListener('click', () => go(element.dataset.v)));

$('#globalSearch').addEventListener('input', event => {
  const query = event.target.value.trim().toLowerCase();
  const results = cases.filter(item => [item.address, item.parcel, item.owner, item.id, item.conflict]
    .some(value => value.toLowerCase().includes(query)));

  renderQueue(results);
  $('#searchCount').textContent = query
    ? `${results.length} matching synthetic case${results.length === 1 ? '' : 's'}`
    : '4 synthetic cases';
});

$('#resolve').addEventListener('click', () => {
  renderCurrentCase();
  go('review');
});

$('#inspectBtn').addEventListener('click', event => {
  showRabbit(event.currentTarget);
  renderRecord();
  showTraceState('Following the evidence trail…', () => go('records'));
});

$('#approveBtn').addEventListener('click', () => updateReviewState('approved'));
$('#rejectBtn').addEventListener('click', () => updateReviewState('rejected'));
$('#assignBtn').addEventListener('click', () => toast(`${current.address} assigned to the specialist path in this prototype.`));
$('#installBtn').addEventListener('click', () => toast('Install becomes available when the browser confirms PWA eligibility.'));

renderQueue();
renderCurrentCase();

let deferredPrompt;
window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  deferredPrompt = event;
  $('#installBtn').classList.remove('hidden');
  $('#installBtn').onclick = async () => {
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    $('#installBtn').classList.add('hidden');
  };
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js'));
}
