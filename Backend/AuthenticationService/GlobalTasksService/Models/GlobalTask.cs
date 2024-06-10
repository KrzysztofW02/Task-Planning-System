using MongoDB.Bson;

namespace GlobalTasksService.Models
{
    public class GlobalTask
    {
        public string? _id { get; set; }
        public string TaskName { get; set; }
        public string? TaskDescription { get; set; }
        public DateTime TaskStart { get; set; }
        public DateTime TaskEnd { get; set; }
        public List<string>? Participants { get; set; }

        public GlobalTask()
        {
            _id = Guid.NewGuid().ToString();
            Participants = new List<string>();
        }
    }
}
