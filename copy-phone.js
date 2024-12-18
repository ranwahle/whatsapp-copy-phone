window.addEventListener("load", () => {
  setInterval(() => {
    addCopyPhoneCapability();
    copyPhoneFromProfileDetails();
  }, 1000);
});

async function getPhoneFromProfileDetails(phoneAncore) {
    const phoneElement = document.querySelector(':has(>h2)');
    if (phoneElement) {
      const phone = phoneElement.innerText.replace(/\D/g, '')
        .replace('972', '0');
      try {
        await navigator.clipboard.writeText(phone);
        document.querySelector('div[role="button"] span[data-icon="x"]').click();
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
          document.querySelector('div[role="button"] span[data-icon="x"]').click();
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
  document.querySelectorAll('[role="button"][aria-label^="Open chat details for"]').forEach((item) => {
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
