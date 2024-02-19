const totalseat = 40;
const price = 550;
const className = 'Economy';
const seatButtons = document.querySelectorAll('.seat');
const ticketInfo = document.querySelector('.table tbody');
const contactNumber = document.querySelector('#contact');
const ticketcounter = document.getElementById('ticketcounter');
const maxAlert = document.getElementById('maxalert');
const freeseat = document.getElementById('freeseat');
const totalP = document.getElementById('totalP');
const grandP = document.getElementById('grandP');
const nextButton = document.getElementById('next');
const appyButton = document.getElementById('apply');
const coupon = document.getElementById('coupon');
const discount = document.getElementById('discount');
const mainSection = document.querySelectorAll('main-sections');
const success = document.getElementById('success');
const continueButton = document.getElementById('continue');
const couponInput = document.getElementById('coupon-input');
const invalidCoupon = document.getElementById('invalid-coupon');

var count = 0;
var cost = 0;
var checker = false;
var tempArr = [];
var invalidCouponChecker = false;

contactNumber.addEventListener('input', handleNextButtonState);
appyButton.addEventListener('click', grandTotalCounter);
nextButton.addEventListener('click', handleNexButtonAction);

function handleNexButtonAction() {
    window.location.href = 'success.html';
}

function handleNextButtonState() {
    if (contactNumber.value.trim() !== '' && !isNaN(contactNumber.value) && count !== 0) {
        nextButton.removeAttribute('disabled');
        nextButton.style.backgroundColor = '#1dd100';
    }
}

function grandTotalCounter() {
    if (count == 4) {
        appyButton.removeAttribute('disabled');
        appyButton.style.backgroundColor = '#1dd100';
        if (coupon.value == 'NEW15') {
            grandP.innerText = cost - ((15 / 100) * cost);
            const dis = document.createElement('p');
            dis.textContent = 'Discount';
            const amount = document.createElement('p');
            amount.textContent = 'BDT ' + ((15 / 100) * cost);
            discount.classList.add('flex');
            discount.appendChild(dis);
            discount.appendChild(amount);
            discount.classList.remove('hidden');
            couponInput.classList.add('hidden');
            if (invalidCouponChecker) {
                invalidCoupon.classList.add('hidden');
            }
        }
        else if (coupon.value == 'Couple 20') {
            grandP.innerText = cost - ((20 / 100) * cost);
            const dis = document.createElement('p');
            dis.textContent = 'Discount';
            const amount = document.createElement('p');
            amount.textContent = 'BDT ' + ((20 / 100) * cost);
            discount.classList.add('flex');
            discount.appendChild(dis);
            discount.appendChild(amount);
            discount.classList.remove('hidden');
            couponInput.classList.add('hidden');
            if (invalidCouponChecker) {
                invalidCoupon.classList.add('hidden');
            }
        }
        else if (coupon.value !== '') {
            if (!invalidCouponChecker) {
                const warn = document.createElement('p');
                warn.textContent = 'Invalid coupon code!'
                warn.style.color = 'red';
                invalidCoupon.classList.remove('hidden');
                invalidCoupon.classList.add('flex');
                invalidCoupon.appendChild(warn);
                invalidCouponChecker = true;
            }
        }
    }
}

for (let i = 1; i < seatButtons.length; i++) {
    const seat = seatButtons[i];
    seat.addEventListener('click', function (event) {
        const seatId = seat.id;

        if (count < 4 && !tempArr.includes(seatId) && seatId) {
            count++;
            cost += price;
            tempArr.push(seatId);
            ticketcounter.innerText = count;
            const row = document.createElement('tr');

            const seatD = document.createElement('td');
            seatD.textContent = seatId;

            const classD = document.createElement('td');
            classD.textContent = className;

            const priceD = document.createElement('td');
            priceD.textContent = price;

            row.appendChild(seatD);
            row.appendChild(classD);
            row.appendChild(priceD);

            ticketInfo.appendChild(row);
            freeseat.textContent = totalseat - count;

            totalP.textContent = cost;
            grandP.textContent = cost;

            seat.style.backgroundColor = '#1dd100';
            seat.style.color = 'white';

            event.stopPropagation();
            handleNextButtonState();
            grandTotalCounter();
        }
        else if (tempArr.includes(seatId)) {
            event.stopPropagation();
        }
        else if (count >= 4) {
            if (!checker) {
                const p = document.createElement('p');
                p.textContent = 'Sorry, you can only buy 4 ticket.';
                p.style.color = 'red';
                p.style.textAlign = 'center';
                maxAlert.classList.add('font-inter');
                maxAlert.classList.remove('hidden');
                maxAlert.appendChild(p);
                event.stopPropagation();
                checker = true;
            }
        }
    });
}