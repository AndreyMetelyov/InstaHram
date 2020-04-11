let guestSubscriptionButton = document.getElementById('guest-subscription-button');
let subscriptionForm = document.getElementById('subscription-form');
let submitMessageContainer = document.getElementById('submit-message');
let subscriptionsList = document.getElementById('subscriptions-list');

function addSubscription(subscription) {
    let subscriptions = getSubscriptions();
    subscriptions.push(subscription);
    localStorage.setItem('subscriptions', JSON.stringify(subscriptions));
}

function getSubscriptions() {
    return JSON.parse(localStorage.getItem('subscriptions')) || [];
}

function displaySubscriptions(container, subscriptions) {
    container.innerHTML = '';

    subscriptions.forEach(function (subscription) {
        let subscriptionElement = document.createElement('li');
        subscriptionElement.innerText = "Подписчик " + subscription.name;
        container.appendChild(subscriptionElement);
    });
}

subscriptionForm.addEventListener('submit', function(e) {
    e.preventDefault();
    let formData = new FormData(subscriptionForm);
    let subscription = {
        'name': formData.get('username'),
        'phone': formData.get('phone-number'),
        'comment': formData.get('comment')
    };

    addSubscription(subscription);

    submitMessageContainer.innerText = "Спасибо за обращение, " + subscription.name +
     ". Мы с вами обязательно свяжемся в ближайшее время!";

    displaySubscriptions(subscriptionsList, getSubscriptions());

    setTimeout(function () {
        submitMessageContainer.innerText = "";
    }, 1000);

});

displaySubscriptions(subscriptionsList, getSubscriptions());