using System.Collections.Generic;
using System.Runtime.CompilerServices;

namespace BettingParser.Extensions
{
    public static class StringExtensions
    {
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static bool IsSpaceCharacter(this char c)
        {
            return c == ' ' || c == '\t' || (c == '\n' || c == '\r') || c == '\f';
        }
        
        [MethodImpl(MethodImplOptions.AggressiveInlining)]
        public static string StripLeadingTrailingSpaces(this char[] array)
        {
            int startIndex = 0;
            int index = array.Length - 1;
            while (startIndex < array.Length && array[startIndex].IsSpaceCharacter())
                ++startIndex;
            while (index > startIndex && array[index].IsSpaceCharacter())
                --index;
            return new string(array, startIndex, 1 + index - startIndex);
        }
        
        public static string[] SplitWithTrimming(this string str, char c)
        {
            var stringList = new List<string>();
            var charList = new List<char>();
            var charArray = str.ToCharArray();
            for (var index = 0; index <= charArray.Length; ++index)
            {
                if (index == charArray.Length || charArray[index] == c)
                {
                    if (charList.Count > 0)
                    {
                        var str1 = charList.ToArray().StripLeadingTrailingSpaces();
                        if (str1.Length != 0)
                            stringList.Add(str1);
                        charList.Clear();
                    }
                }
                else
                {
                    charList.Add(charArray[index]);
                }
            }

            return stringList.ToArray();
        }
    }
}