const btn = document.getElementById('menu-btn')
const ham = document.getElementById('menu')




btn.addEventListener('click', () => {
    btn.classList.toggle('open')
    ham.classList.toggle('flex')
    ham.classList.toggle('hidden')
})