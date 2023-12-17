window.addEventListener("load", () => {
 addCopyPhoneCapability();
 setInterval(addCopyPhoneCapability, 1000);
  setInterval(copyPhoneFromProfileDetails, 1000);
});

function copyPhoneFromProfileDetails() {
  const profileDetails = document.querySelector('[title="Profile Details"]');
    if (profileDetails && !profileDetails.getAttribute('copy-event-added')) {
      const phoneAncore = document.createElement('a');
      phoneAncore.href = 'javascript:void(0)';
      phoneAncore.innerText = '☎️';
      profileDetails.insertAdjacentElement('beforebegin', phoneAncore);
      phoneAncore.addEventListener('click', (evt) => {
        profileDetails.click();
        setTimeout(() => {
          const phoneElement = document.querySelector(':has(>h2)').childNodes[1];
          if (phoneElement) {
            const phone = phoneElement.innerText.replace(/\D/g, '')
                .replace('972', '0');
            navigator.clipboard.writeText(phone);
            phoneAncore.innerText = '✅';
            setTimeout(() => {
              phoneAncore.innerText = '☎️';
              document.querySelector('[aria-label="Close"]').click();
            }, 1000);
          }
        }, 1000);
      });
        profileDetails.setAttribute('copy-event-added', 'true');
      // setTimeout(() => {
      //   const phoneElement = document.querySelector(':has(>h2)').childNodes[1];
      //     if (phoneElement && !phoneElement.getAttribute('copy-event-added')) {
      //
      //       phoneAncore.addEventListener("click", (evt) => {
      //       navigator.clipboard.writeText(phoneElement.innerText);
      //       phoneAncore.innerText = '✅';
      //       setTimeout(() => {
      //           phoneAncore.innerText = '☎️';
      //       }, 1000);
      //       });
      //       phoneElement.setAttribute('copy-event-added', 'true');
      //   }
      //   }, 1000);
    }
}

function addCopyPhoneCapability() {
  document.querySelectorAll('[testId="author"]').forEach((item) => {
    if (!item.getAttribute('copy-event-added')) {
      const phoneAncore = document.createElement('a');
      phoneAncore.href = 'javascript:void(0)';
        phoneAncore.innerText = '☎️';
      item.insertAdjacentElement('beforebegin', phoneAncore);

      phoneAncore.addEventListener("click", (evt) => {
        const phone = item.innerText.replace(/\D/g, '')
            .replace('972', '0');
        navigator.clipboard.writeText(phone);
          phoneAncore.innerText = '✅';
          setTimeout(() => {
            phoneAncore.innerText = '☎️';
          }, 1000);
      });
      item.setAttribute('copy-event-added', 'true');
    }
  });
}
