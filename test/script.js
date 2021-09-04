const getData = async()=> {
    const res = await fetch('https://puzzle.mead.io/puzzle')
    const data = await res.json();
    console.log(data)

}

getData()