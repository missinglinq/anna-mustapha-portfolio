const cases=[
{id:'PT-1042',address:'1432 Cypress Ave',parcel:'41000001',owner:'Jordan Ellis',status:'Targeted delta',confidence:72,conflict:'J. Ellis Estate',permit:'Renovation',codes:'1 active / 2 prior',tax:'No signal',mva:'Official benchmark context',route:'review'},
{id:'PT-1043',address:'908 Magnolia St',parcel:'41000028',owner:'Lena Baptiste',status:'Targeted delta',confidence:81,conflict:'Assessor mismatch after sale signal',permit:'None',codes:'1 active / 1 prior',tax:'Current',mva:'Official benchmark context',route:'review'},
{id:'PT-1044',address:'2710 Laurel Rd',parcel:'41000144',owner:'Succession of R. Carter',status:'Manual review',confidence:46,conflict:'Succession + multiple possible heirs',permit:'Roof permit',codes:'2 active / 3 prior',tax:'Delinquency signal',mva:'Official benchmark context',route:'manual'},
{id:'PT-1045',address:'624 Dumaine St',parcel:'41000175',owner:'Marisol Nguyen',status:'Reuse + verify',confidence:93,conflict:'No material change signal',permit:'Electrical',codes:'1 active / 0 prior',tax:'Current',mva:'Official benchmark context',route:'reuse'}
];
let current=cases[0];
const names={command:'AI Command Center',property:'Property 360',records:'Record Intelligence',market:'Market Context',review:'Human Review'};
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2300)}
function go(v){$$('.view').forEach(x=>x.classList.remove('active'));$('#'+v).classList.add('active');$$('[data-v]').forEach(x=>x.classList.toggle('active',x.dataset.v===v));$('#title').textContent=names[v];window.scrollTo({top:0,behavior:'smooth'})}
function routeClass(c){return c.route==='manual'?'red':c.route==='reuse'?'green':'gold'}
function renderQueue(list=cases){const body=$('#queueBody');body.innerHTML=list.map(c=>`<tr data-case="${c.id}"><td><b>${c.address}</b><small>${c.id} • Parcel ${c.parcel}</small></td><td>${c.conflict}</td><td><span class="pill ${c.confidence<60?'red':c.confidence<85?'amber':'green'}">${c.confidence}%</span></td><td>${c.route==='manual'?'Complex researcher / counsel':c.route==='reuse'?'Verify delta + approve':'Validate source + parties'}</td><td><span class="pill ${routeClass(c)}">${c.status}</span></td></tr>`).join('');
  $$('#queueBody tr').forEach(r=>r.onclick=()=>{current=cases.find(c=>c.id===r.dataset.case);renderProperty();go('property')});
}
function renderProperty(){
  $('#propertyAddress').textContent=current.address; $('#propertyParcel').textContent=`Parcel ${current.parcel} • ${current.id}`; $('#baselineOwner').textContent=current.owner;
  $('#conflictOwner').textContent=current.conflict; $('#permitVal').textContent=current.permit; $('#codeVal').textContent=current.codes; $('#taxVal').textContent=current.tax;
  $('#alignmentVal').textContent=current.route==='reuse'?'5 of 5 agree':current.route==='manual'?'2 of 5 agree':'4 of 5 agree';
  $('#alignmentNote').textContent=current.route==='reuse'?'No material conflict':'Human review required';
  $('#briefText').textContent=current.route==='reuse'?`ParcelTrace found no material ownership-change signal after the last verified baseline for ${current.address}. Supporting systems align, but a researcher still confirms the delta before reuse.`:`ParcelTrace detected a change or identity signal for ${current.address}: ${current.conflict}. The system does not treat this as a title conclusion.`;
  $('#routeBadge').textContent=current.status; $('#routeBadge').className=`pill ${routeClass(current)}`;
}
function updateReviewState(state){const card=$('#reviewState');card.dataset.state=state;$('#reviewStatus').textContent=state==='approved'?'Approved by researcher':state==='rejected'?'Returned for more research':'Awaiting researcher decision';
  if(state==='approved') toast('Human approval recorded in prototype audit log.'); else if(state==='rejected') toast('Case returned for additional research.');
  $('#auditLog').innerHTML=`<b>Latest activity</b><p>${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})} — ${state==='approved'?'Researcher approved AI-assisted delta review.':state==='rejected'?'Researcher rejected recommendation and requested additional research.':'Evidence review opened.'}</p>`;
}
$$('[data-v]').forEach(x=>x.addEventListener('click',()=>go(x.dataset.v)));
$('#globalSearch').addEventListener('input',e=>{const q=e.target.value.trim().toLowerCase();const found=cases.filter(c=>[c.address,c.parcel,c.owner,c.id].some(v=>v.toLowerCase().includes(q)));renderQueue(found);$('#searchCount').textContent=q?`${found.length} matching synthetic case${found.length===1?'':'s'}`:'4 synthetic cases';});
$('#resolve').addEventListener('click',()=>{renderProperty();go('review');updateReviewState('pending')});
$('#approveBtn').addEventListener('click',()=>updateReviewState('approved'));
$('#rejectBtn').addEventListener('click',()=>updateReviewState('rejected'));
$('#inspectBtn').addEventListener('click',()=>go('records'));
$('#installBtn').addEventListener('click',()=>toast('Install becomes available when the browser confirms PWA eligibility.'));
renderQueue(); renderProperty();
let deferredPrompt; window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').classList.remove('hidden');$('#installBtn').onclick=async()=>{deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').classList.add('hidden')}});
if('serviceWorker' in navigator) window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
