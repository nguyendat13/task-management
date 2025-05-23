using System.ComponentModel.DataAnnotations;

namespace taskmanager.DTOs.WorkProgress
{
    public class CreateWorkProgressDTO
    {
        [Required]
        public string Status { get; set; }
    }
}
