namespace UserTasksService.DTOs
{
    public class UserTaskDto
    {
        public string _id { get; set; }
        public string TaskName { get; set; }
        public string Category { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskEnd { get; set; }
        public string? GlobalTaskId { get; set; }
    }
}
