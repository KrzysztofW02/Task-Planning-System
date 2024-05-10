using AutoMapper;
using GlobalTasksService.Models;
using MongoDB.Bson;

namespace GlobalTasksService.Services
{
    public class AutoMapperProfile:Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BsonDocument, GlobalTask>()
                .ForMember(dest => dest._id, opt => opt.MapFrom(src => src["_id"]))
                .ForMember(dest => dest.TaskName, opt => opt.MapFrom(src => src["TaskName"].AsString))
                .ForMember(dest => dest.TaskDescription, opt => opt.MapFrom(src => src["TaskDescription"].AsString))
                .ForMember(dest => dest.TaskStart, opt => opt.MapFrom(src => src["TaskStart"].AsBsonDateTime.ToLocalTime()))
                .ForMember(dest => dest.TaskEnd, opt => opt.MapFrom(src => src["TaskEnd"].AsBsonDateTime.ToLocalTime()))
                .ForMember(dest => dest.Participants, opt => opt.MapFrom(src => src["Participants"].AsBsonArray.Select(x => x.AsString).ToList()));
        }
    }
}
