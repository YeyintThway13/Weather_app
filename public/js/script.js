console.log('Hello')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location = search.value
    message1.textContent = 'Loading'
    message2.textContent=''

    fetch('http://localhost:2000/weather?address='+location).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent=data.error
                message2.textContent=''
            }else{
                message1.textContent=data.location
                message2.textContent=data.forecast

            }
        })
    })
})
