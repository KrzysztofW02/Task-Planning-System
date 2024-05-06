namespace GlobalTasksService.Models
{
    public class GlobalTask
    {
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskEnd { get; set; }
        public List<string> Participants { get; set; }
    }
}
