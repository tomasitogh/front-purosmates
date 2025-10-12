// Este componente recibe la página actual y el número total de páginas como 'props'.
function Pagination({ totalPages, currentPage, onPageChange }) {
    
    // Función para generar un array de números de 1 hasta totalPages
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="pagination-controls">
            {/* Control Anterior */}
            <button 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {/* Números de Página */}
            {pages.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={pageNumber === currentPage ? 'active' : ''}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}

            {/* Control Siguiente */}
            <button 
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    );
}

export default Pagination;