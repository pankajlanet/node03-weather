console.log('Client side javascript file is loaded!')

    const inputSearch = document.getElementById('search');
    const weatherForm = document.getElementById('send');
    const output = document.getElementById("output")


    weatherForm.addEventListener('submit', (event)=> {
        event.preventDefault()
        const data = getDataInfo(inputSearch.value)
        console.log(data)
       
    })

    // we will remove the local  host 
  const getDataInfo = async(city)=> {
    const res = await fetch('/weather?address='+city)
    console.log( " response is :", res)
    const wdata = await res.json();
    //console.log('data is : ',wdata.data)
    return wdata.data
  }