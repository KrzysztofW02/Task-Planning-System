namespace UserTasksService.Models
{
	public class UserTask
	{
		public string _id { get; set; }
		public string UserName { get; set; }
		public string TaskName { get; set; }
		public string TaskDescription { get; set; }
		public DateTime TaskStart { get; set; }
		public DateTime TaskEnd { get; set; }
		public string? GlobalTaskId { get; set; }
		public string Category { get; set; }

		public UserTask()
		{
			_id = Guid.NewGuid().ToString();
		}
	}
}
