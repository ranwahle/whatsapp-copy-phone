window.addEventListener("load", () => {
 addCopyPhoneCapability();
 setInterval(addCopyPhoneCapability, 1000);
  setInterval(copyPhoneFromProfileDetails, 1000);
});

function copyPhoneFromProfileDetails() {
  const profileDetails = document.querySelector('div [id="main"] header div');
    if (profileDetails && !profileDetails.getAttribute('copy-event-added')) {
      const phoneAncore = document.createElement('a');
      phoneAncore.href = 'javascript:void(0)';
      phoneAncore.innerText = '☎️';
      profileDetails.insertAdjacentElement('beforebegin', phoneAncore);
      phoneAncore.addEventListener('click', (evt) => {
        profileDetails.click();
        setTimeout(() => {
          const phoneElement = document.querySelector(':has(>h2)')?.childNodes[1];
          if (phoneElement) {
            const phone = phoneElement.innerText.replace(/\D/g, '')
                .replace('972', '0');
            navigator.clipboard.writeText(phone);

            setTimeout(() => {
              phoneAncore.innerText = '☎️';
              document.querySelector('[aria-label="Close"]').click();
              phoneAncore.innerText = '✅';
                setTimeout(() => {

                    setTimeout(() => {
                        phoneAncore.innerText = '☎️';
                    });
                }, 1000);
            }, 500);
          }
        }, 1000);
      });
        profileDetails.setAttribute('copy-event-added', 'true');
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
