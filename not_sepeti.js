const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');



yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);
document.addEventListener('DOMContentLoaded', localStorageOku)


function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;

    if(tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')){
  
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if(tiklanilanEleman.classList.contains('gorev-sil')){

        if(confirm('Are You Sure ? ')) {

            tiklanilanEleman.parentElement.classList.toggle('kaybol');
            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            
            localStorageSil(silinecekGorev);
    
            tiklanilanEleman.parentElement.addEventListener('transitionend',function() {
    
                tiklanilanEleman.parentElement.remove();
            });

        }
            
        
        
    }
}

function gorevEkle(e) {

    e.preventDefault();

    if(yeniGorev.value.length > 0) {

        gorevItemOlustur(yeniGorev.value);
    
        localStorageKaydet(yeniGorev.value);
    
        yeniGorev.value = '';
    }
    else {
        alert('Empty job description cannot be made');
    }


}

function localStorageKaydet(yeniGorev) {
    let gorevler;

    if(localStorage.getItem('gorevler') == null){
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku() {
    let gorevler;

    if(localStorage.getItem('gorevler') == null){
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    gorevler.forEach(function(gorev) {
        
        gorevItemOlustur(gorev);
        
    });

}

function gorevItemOlustur(gorev) {
    
                
        //div create

        const gorevDiv = document.createElement('div');
        gorevDiv.classList.add('gorev-item');

        //li create

        const gorevLi = document.createElement('li');
        gorevLi.classList.add('gorev-tanim');
        gorevLi.innerText = gorev;

        gorevDiv.appendChild(gorevLi);

        //tamamlandi butonu ekle

        const gorevTamamBtn = document.createElement('button');
        gorevTamamBtn.classList.add('gorev-btn');
        gorevTamamBtn.classList.add('gorev-btn-tamamlandi');
        gorevTamamBtn.innerHTML = '<i class="far fa-check-square"></i>';

        gorevDiv.appendChild(gorevTamamBtn);

        const gorevSilBtn = document.createElement('button');
        gorevSilBtn.classList.add('gorev-btn');
        gorevSilBtn.classList.add('gorev-sil');
        gorevSilBtn.innerHTML = '<i class="far fa-trash-alt"></i>';

        gorevDiv.appendChild(gorevSilBtn);
        // ulye oluşturdugumuz divi ekleyelim 

    

        gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
    let gorevler;

    if(localStorage.getItem('gorevler') == null){
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }

    // splice ile silelim

    const silinecekElemanIndex = gorevler.indexOf(gorev);
    console.log(silinecekElemanIndex);
    gorevler.splice(silinecekElemanIndex,1);

    localStorage.setItem('gorevler',JSON.stringify(gorevler));
    
}