using AutoMapper;
using MongoDB.Bson;
using UserTasksService.DTOs;
using UserTasksService.Models;

namespace UserTasksService
{
    public class AutoMapperProfile: Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<UserTask, UserTaskDto>();
            CreateMap<UserTaskDto, UserTask>();
            CreateMap<BsonDocument, UserTask>();
            CreateMap<UserTask, BsonDocument>();
            CreateMap<BsonDocument, UserTaskDto>()
            .ForMember(dest => dest._id, opt => opt.MapFrom(src => src["_id"].AsString))
            .ForMember(dest => dest.TaskName, opt => opt.MapFrom(src => src["TaskName"].AsString))
            .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src["Category"].AsString))
            .ForMember(dest => dest.TaskDescription, opt => opt.MapFrom(src => src["TaskDescription"].AsString))
            .ForMember(dest => dest.TaskStart, opt => opt.MapFrom(src => src["TaskStart"].AsBsonDateTime.ToLocalTime())) 
            .ForMember(dest => dest.TaskEnd, opt => opt.MapFrom(src => src["TaskEnd"].AsBsonDateTime.ToLocalTime()))
            .ForMember(dest => dest.GlobalTaskId, opt => opt.MapFrom(src => src["GlobalTaskId"].IsBsonNull ? null : src["GlobalTaskId"].AsString));
        }
    }
}
