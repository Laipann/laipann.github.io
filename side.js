function run(e) {

    e.preventDefault()

    const hal1 = document.getElementById('halaman1')
    const hal2 = document.getElementById('halaman2')

    hal1.style.display = 'none'
    hal2.style.display = 'block'

    const id= e.target.id || e.currentTarget.id

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














