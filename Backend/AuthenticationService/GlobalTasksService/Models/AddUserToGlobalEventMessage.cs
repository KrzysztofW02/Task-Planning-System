namespace GlobalTasksService.Models
{
    public class AddUserToGlobalEventMessage
    {
        public string _id { get; set; }
        public string TaskName { get; set; }
        public string TaskDescription { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskEnd { get; set; }
        public string UserToAddID { get; set; }
    }
}
