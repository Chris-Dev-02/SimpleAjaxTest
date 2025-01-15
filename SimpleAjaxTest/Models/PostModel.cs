namespace SimpleAjaxTest.Models
{
    public class PostModel
    {
        public int Id { get; set; }
        public string? PublishedBy { get; set; }// = "Anonymous";
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
