import "./App.css";
import React from 'react' //state tanılayacak oldugumuzda bunu ımport etmemmız gerekıyor.

function Arama({aramaMetni,onSearch}){
  
  function handleChange(event){
   setAramaMetni(event.target.value)
    props.onSearch(event); //eventin kendısını buraya gecırıyor.
    localStorage.setItem("aranan", event.target.value);  
  }
  React.useEffect(() => {
    localStorage.setItem("aranan", aramaMetni); 
  },[aramaMetni]);
 
  return(
    <div>
    <label htmlFor="arama">Ara: </label>
    <input id="arama" type="text"  onChange={onSearch} value={aramaMetni}/>
    <p>
      
    </p>
    </div>
  ) //yeni verı geldıgınde ekranda o verırın gozukmesını saglar.
}
function Yazi({id,url,baslik,yazar,yorum_sayisi,puan}){
  return(
    <li key={id} >
    <span>
      <a href={url}>{baslik}</a>, 
    </span>
    <span><b>Yazar:</b> {yazar}, </span>
    <span><b>Yorum Sayısı:</b> {yorum_sayisi}, </span>
    <span><b>Puan:</b> {puan}</span>
  </li>
  )
}
function Liste(props){
  return(
    <ul>
       {props.yazilar.map(function(yazi){
        return(
          <Yazi key={yazi.id} {...yazi}/>//uc nokta koyarak yazının ıcınde ne varsa dagıtıp atamıs olduk.

        );
       })}
      </ul>
  )
}
function App() {
  const[aramaMetni,setAramaMetni]=React.useState(localStorage.getItem("aranan")||"React"); //state tanımladık ve use statae aracılıgıyla ılk deger atamıs olduk. local storage ds bır sey varsa onu yaz yosa react yanı atanan degreı yaz.
  const yaziListesi = [
    {
      baslik: "React Öğreniyorum",
      url: "www.sdu.edu.tr",
      yazar: "Sinan Yüksel",
      yorum_sayisi: 3,
      puan: 4,
      id: 0,
    },
    {
      baslik: "Web Teknolojileri ve Programlama",
      url: "wwww.google.com.tr",
      yazar: "Asım Yüksel",
      yorum_sayisi: 2,
      puan: 5,
      id: 1,
    },

    {
      baslik: "Temel SQL Komutları",
      url: "www.oguzhantas.com",
      yazar: "Oğuzhan taş",
      yorum_sayisi: 7,
      puan: 3.0,
      id: 2
    },

    {
      baslik: "Javascript Öğreniyorum",
      url: "www.wecodeucate.com",
      yazar: "Codeucate",
      yorum_sayisi: 21,
      puan: 4.5,
      id: 3
    },
  ];
  const arananYazilar = yaziListesi.filter(function (yazi) {
    return (
      yazi.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) || yazi.yazar.toLowerCase().includes(aramaMetni.toLowerCase()) 
    );
  });

  //callback metodu olusturma.
  function handleSearch(event){
    setAramaMetni(event.target.value);//handlesearch fonsıyonumuzu tanımladık.
    //localStorage.setItem("aranan",event.target.value); //aranan kısmına ne yazarsa onu local storage a yaz.

  }
  React.useEffect(()=>{
    localStorage.setItem("aranan",aramaMetni); 
  },[aramaMetni]); //arama metnı bunun bı bagımlılıgı oldugu ıcın belırtmemız gerekıyor.eger bos bırakırsak sadece bır kere tetıklenır.
  
  return (
    <div>
      <h1>Yazılar</h1>
      <Arama aramaMetni = {aramaMetni} onSearch={handleSearch}/>
      <strong>{aramaMetni}araniyor...</strong>
      <hr />
     <Liste yazilar = {arananYazilar}/> 
    </div>
  );
}
export default App;
