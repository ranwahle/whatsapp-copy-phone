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
const closeButtonQueryEnglish = 'div[role="button"][aria-label="Close"]';
  const cloaseButtonQueryHebrew = 'div[role="button"][aria-label="סגירה"]';
     const closeButton = document.querySelector(closeButtonQueryEnglish) || document.querySelector(cloaseButtonQueryHebrew);
  return closeButton;
}


async function getPhoneFromProfileDetails(phoneAncore) {
  
  const phoneElement = document.querySelector(':has(>h2)') || getPhoneElementForBusiness();
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
