using System;
using System.ComponentModel;
using System.Reflection;
using System.Collections.Generic;

namespace CleaningDLL.Entity
{
    public class EnumStatus
    {
        public enum Status
        {
            [Description("Оплачена")] scheduledDeparture = 1,//ожидает
            [Description("В процессе")] inProcessing = 2,
            [Description("Завершена")] сompleted = 3,
            [Description("Отменена")] canceled = 4,
            [Description("Сформирована")] formed = 5,
            [Description("Назначен выезд")] paid = 6 
        }
        public static List<string> GetStatusesForAdmin(string st)
        {
            Status startStatus = GetValueFromDescription<Status>(st);
            List<string> list = new List<string>();
            foreach (Status status in Enum.GetValues(typeof(Status)))
            {
                    list.Add(GetDescription(status));
            }
            return list;
        }
        public static List<string> GetStatusesForBrigadir(string st)
        {
            Status startStatus = GetValueFromDescription<Status>(st);
            List<string> list = new List<string>();
            foreach(Status status in Enum.GetValues(typeof(Status)))
            {
                if(status >= startStatus && status != Status.canceled)
                {
                    list.Add(GetDescription(status));
                }
            }
            return list;
        }
        public static string GetDescription(Enum enumElement)
        {
            Type type = enumElement.GetType();

            MemberInfo[] memInfo = type.GetMember(enumElement.ToString());
            if (memInfo != null && memInfo.Length > 0)
            {
                object[] attrs = memInfo[0].GetCustomAttributes(typeof(DescriptionAttribute), false);
                if (attrs != null && attrs.Length > 0)
                    return ((DescriptionAttribute)attrs[0]).Description;
            }

            return enumElement.ToString();
        }
        public static T GetValueFromDescription<T>(string description) where T : Enum
        {
            foreach (var field in typeof(T).GetFields())
            {
                if (Attribute.GetCustomAttribute(field,
                typeof(DescriptionAttribute)) is DescriptionAttribute attribute)
                {
                    if (attribute.Description == description)
                        return (T)field.GetValue(null);
                }
                else
                {
                    if (field.Name == description)
                        return (T)field.GetValue(null);
                }
            }

            throw new ArgumentException("Не найдено!", nameof(description));
        }
    }
    
}