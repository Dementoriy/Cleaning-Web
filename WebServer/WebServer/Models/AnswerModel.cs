using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebServer.Models
{
    public class AnswerModel
    {
        public AnswerModel(bool status, object? answer, int? error, string? errorText)
        {
            this.status = status;
            this.answer = answer;
            this.error = error;
            this.errorText = errorText;
        }

        public bool status { get; set; }
        public object? answer { get; set; }
        public int? error { get; set; }
        public string? errorText { get; set; }
    }
}
