namespace Biblioteca.Models
{
    public class Bibliotecario
    {       
        public Int32? IdBibliotecario {get;set;}
        public String Nombre { get;set;}
        public String APaterno { get; set; }
        public String? AMaterno { get; set; }
        public Int32? IdUsuario { get; set; }
    }
}
