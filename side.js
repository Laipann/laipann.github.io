function back() {
    const hal1 = document.getElementById('halaman1')
    const hal2 = document.getElementById('halaman2')

    hal1.style.display = 'block'
    hal2.style.display = 'none'

}






function run(e) {

    e.preventDefault()

    const hal1 = document.getElementById('halaman1')
    const hal2 = document.getElementById('halaman2')

    hal1.style.display = 'none'
    hal2.style.display = 'block'

    const id= e.target.id || e.currentTarget.id

    const judul = document.getElementById('dJudul')
    judul.innerHTML = id
    

    $.ajax({
        url: 'https://www.googleapis.com/books/v1/volumes?q=' + id, 
        success: result => {
            const books = result.items;
    
            if (books.length >= 6) {
                let usedIndices = [];
    
                function getRandomIndex() {
                    let index;
                    do {
                        index = Math.floor(Math.random() * books.length);
                    } while (usedIndices.includes(index));
                    usedIndices.push(index);
                    return index;
                }
    
                $('.down-cards').each(function(index) {
                    const randomIndex = getRandomIndex();
                    const book = books[randomIndex];
                    const card = cards1(book.volumeInfo, book.id);
                    $(this).html(card);
                });
    
                $(document).on('click', '.images-card', function () {
                    const jar = document.getElementById('navbar-jar');
                    jar.style.display = 'none';
    
                    const bookId = $(this).data('bookid'); 
                    $.ajax({
                        url: 'https://www.googleapis.com/books/v1/volumes/' + bookId,
                        success: b => {
                            const volumeInfo = b.volumeInfo;
                            const bookDetail = showBookDetail(volumeInfo);
                            $('.modal-body').html(bookDetail);
                            $('#bookDetailModal').modal('show'); 
                        },
                        error: (e) => {
                            console.log(e.responseText);
                        }
                    });
                });
            } else {
                console.log('Tidak cukup hasil dari API untuk menampilkan 6 buku.');
            }
        },
        error: (e) => {
            console.log(e.responseText);
        }
    });
    
    function cards1(volumeInfo, bookId) {
        return `<div class="card-list">
                <img src="${volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'}" class="images-card" alt='gambar tidak tersedia' data-bookid="${bookId}">
                <h3 class="title">${volumeInfo.title}</h3> 
        </div>`;
    }


}



// search 
$('.search-button').on('click', function () {
    $.ajax({
        url : 'https://www.googleapis.com/books/v1/volumes?q=' + $('.input-keywoard').val() + '&maxResults=20&startIndex=20' ,
        success : result  => {
        const books = result.items;
        
        let cards='';
    
        books.forEach(b => {
            const volumeInfo = b.volumeInfo;
            cards += showCard(volumeInfo, b.id); // Sesuaikan dengan struktur data Google Books
        });   
        $('.movie-container').html(cards);
    
        // ketika tombol detail di klik
        $('.modal-detail-button').on('click', function () {
            $.ajax({
                url : 'https://www.googleapis.com/books/v1/volumes/' + $(this).data('imdbid'),
                success : b => {
                    const volumeInfo = b.volumeInfo;
                    const bookDetail = showBookDetail(volumeInfo); // Sesuaikan dengan struktur data Google Books
                    $('.modal-body').html(bookDetail);
                },
                error: (e) =>  {
                    console.log(e.responseText);
                }
            });
        });
        },
        error : (e) =>  {
            console.log(e.responseText);
        }
    });
});

function showCard(volumeInfo, id) {
    return `<div class="col-md-4 my-3">
        <div class="card">
            <img src="${volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'}" class="card-img-topss">
            <div class="card-body">
            <h5 class="card-title">${volumeInfo.title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${volumeInfo.publishedDate}</h6>
            <a href="#" class="btn btn-primary modal-detail-button" data-bs-toggle="modal" data-bs-target="#movieDetailModal" data-imdbid="${id}">Lihat Buku</a>
            </div>
        </div>
    </div>`;
}

function showBookDetail(volumeInfo) {
    return `<div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <img src="${volumeInfo.imageLinks?.thumbnail}" alt="">
                    <ul class="list-group">
                        <li class="list-group-item"><h4>${volumeInfo.title}</h4></li>
                        <li class="list-group-item"><strong>Rilis : </strong>${volumeInfo.publishedDate}</li>
                        <li class="list-group-item"><strong>Pembuat : </strong>${volumeInfo.authors?.join(', ')}</li>
                        <li class="list-group-item"><strong>Publisher : </strong>${volumeInfo.publisher}</li>
                        <li class="list-group-item"><strong>Jumlah Halaman : </strong>${volumeInfo.pageCount} pages</li>
                        <li class="list-group-item"><strong>Baca Buku : </strong><a href="${volumeInfo.previewLink}" target="_blank">Baca Buku</a></li>
                    </ul>
                </div>
                <div class="col-md"></div>
            </div>
        </div>`;
}



function cards1(volumeInfo, bookId) {
    return `<div class="card-list">
            <img src="${volumeInfo.imageLinks?.thumbnail || 'default-thumbnail.jpg'}" class="images-card" alt='gambar tidak tersedia' data-bookid="${bookId}"> <!-- Menambahkan data-bookid -->
    </div>`;
}












