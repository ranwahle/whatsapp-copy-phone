window.addEventListener("load", () => {
 addCopyPhoneCapability();
  setInterval(copyPhoneFromProfileDetails, 1000);
});

async function getPhoneFromProfileDetails(phoneAncore) {
    const phoneElement = document.querySelector(':has(>h2)');
    if (phoneElement) {
      const phone = phoneElement.innerText.replace(/\D/g, '')
        .replace('972', '0');
      try {
        await navigator.clipboard.writeText(phone);
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
  // const header = profileDetails.parentElement;
  // const phoneNumberContainer = header.lastChild;
  // if (phoneNumberContainer) {
  //   const phone = phoneNumberContainer.innerText.replace(/\D/g, '')
  //   .replace('972', '0');
  //   phoneNumberContainer.innerText = phone;
  // }
  
}

function addCopyPhoneCapability() {
  document.querySelectorAll('[testId="author"]').forEach((item) => {
    if (!item.getAttribute('copy-event-added')) {
      const phone = item.innerText.replace(/\D/g, '')
      .replace('972', '0');
      item.innerText = phone;
      const phoneAncore = document.createElement('a');
      phoneAncore.href = 'javascript:void(0)';
        phoneAncore.innerText = '☎️';
      item.insertAdjacentElement('beforebegin', phoneAncore);

      phoneAncore.addEventListener("click", async () => {
     
        // await navigator.clipboard.writeText(phone);
        const iframe = document.createElement('iframe');
        iframe.setAttribute('allow', 'clipboard-write; clipboard-read');
       
        setTimeout(async () => {
          await navigator.clipboard.writeText(phone);

          iframe.remove();
        }, 1000);
        phoneAncore.innerText = '✅';
          setTimeout(() => {
            phoneAncore.innerText = '☎️';
          }, 1000);
      });
      item.setAttribute('copy-event-added', 'true');
    }
  });
}
