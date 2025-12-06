using System;
using System.Security.Cryptography.X509Certificates;

namespace API.DTOs;

public class CreateMessageDto
{
  public required string RecipientId { get; set; }
  public required string Content { get; set; }
}
