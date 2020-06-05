using System;
using System.Runtime.Serialization;

namespace BettingParser.Exceptions
{
    [Serializable]
    public class ParserException : Exception
    {
        public override string Message { get; }
        
        public ParserException()
        {
        }

        public ParserException(object unique)
        {
            Message = $"{unique} html data not found";
        }
        
        public ParserException(string message) : base(message)
        {
        }

        public ParserException(string message, Exception inner) : base(message, inner)
        {
        }

        protected ParserException(
            SerializationInfo info,
            StreamingContext context) : base(info, context)
        {
        }
    }
}