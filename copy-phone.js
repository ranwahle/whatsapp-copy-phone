window.addEventListener("load", () => {
  setInterval(() => {
    addCopyPhoneCapability();
    copyPhoneFromProfileDetails();
  }, 1000);
});

function getPhoneElementForBusiness() {
  const copyableTextElements = document.querySelectorAll('span.copyable-text');
  const englishPredicate = span => span.innerText.startsWith('+')
  const hebreqPreficate = span => span.innerText.charAt(1) === '+';
  return Array.from(copyableTextElements).find(span => englishPredicate(span) || hebreqPreficate(span))
   
}

function getCloseButton() {
const ariaLabels =  {
  hebrewContact: 'סגירה',
  hebrewGroup: 'חזרה',
  englishContact: 'Close',
  englishGroup: 'Back'
}
const closeButtonQueryEnglish = `button[aria-label="${ariaLabels.englishContact}"]`;
const cloaseButtonQueryHebrew = `button[aria-label="${ariaLabels.hebrewContact}"]`;
const closeButtonQueryGtoupHebrew= `button[aria-label="${ariaLabels.hebrewGroup}"]'`
const closeButtonQueryGtoupEnglish= `button[aria-label="${ariaLabels.englishGroup}"]`;

     const closeButton = document.querySelector(closeButtonQueryEnglish) || 
     document.querySelector(closeButtonQueryGtoupEnglish) || 
document.querySelector(closeButtonQueryGtoupHebrew) || 
     document.querySelector(cloaseButtonQueryHebrew);
  return closeButton;
}

function getPhoneNumber() {
return  Array.from(document.querySelectorAll('div.copyable-area section span[dir="auto"].copyable-text.selectable-text')).find(item => item.innerText.startsWith('+'));
}

async function getPhoneFromProfileDetails(phoneAncore) {
  
  const phoneElement =getPhoneNumber() || getPhoneElementForBusiness();
    if (phoneElement) {
      const phone = phoneElement.innerText.replace(/\D/g, '')
        .replace('972', '0');
      try {
        await navigator.clipboard.writeText(phone);
        const closeButton = getCloseButton();
        closeButton.click();
        setTimeout(() => {

          phoneAncore.innerText = '✅';
            setTimeout(() => {

                setTimeout(() => {
                    phoneAncore.innerText = '☎️';
                });
            }, 1000);
        }, 500);
      } catch (e) {
        console.error(e);
        setTimeout(() => {
          getCloseButton().click();
          const div = document.createElement('div');
          div.innerText = `${phone}`;
          div.setAttribute('contentEditable', 'true');

          phoneAncore.parentElement.appendChild(div);
          phoneAncore.parentElement.removeChild(phoneAncore); 
      }, 1000);
      }
     
    }
  
}

function copyPhoneFromProfileDetails() {
  const profileDetails = document.querySelector('div [id="main"] header div');
    if (profileDetails && !profileDetails.getAttribute('copy-event-added')) {
      const phoneAncore = document.createElement('a');
      phoneAncore.href = 'javascript:void(0)';
      phoneAncore.innerText = '☎️';
      profileDetails.insertAdjacentElement('beforebegin', phoneAncore);
      phoneAncore.addEventListener('click', () => {
        profileDetails.click();
        setTimeout(() => getPhoneFromProfileDetails(phoneAncore), 1000);
      });
        profileDetails.setAttribute('copy-event-added', 'true');
    }
}

function addCopyPhoneCapability() {
  const hebrewLabelPrefix =  `פתיחת פרטי הצ'אט עם`;
  const englishLabelPrefix = 'Open chat details for';
  const phoneElements = [...Array.from( document.querySelectorAll(`[role="button"][aria-label^="${englishLabelPrefix}"]`))
    , ...Array.from(document.querySelectorAll(`[role="button"][aria-label^="${hebrewLabelPrefix}"]`))
  ];

 phoneElements.forEach((item) => {
    if (!item.getAttribute('copy-event-added')) {
    
      const phoneAncore = document.createElement('a');
      phoneAncore.href = 'javascript:void(0)';
        phoneAncore.innerText = '☎️';
      item.insertAdjacentElement('beforebegin', phoneAncore);

      phoneAncore.addEventListener("click", async () => {
     
        item.click();
        setTimeout(() => getPhoneFromProfileDetails(phoneAncore), 1000);
      });
      item.setAttribute('copy-event-added', 'true');
    }
  });
}
