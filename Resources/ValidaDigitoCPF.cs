using System;
using System.Collections.Generic;
using System.Text;

namespace Resources
{
    public static class ValidaDigitoCPF
    {
        public static bool Valida(string cpf)
        {
            int soma = 0;
            int digito1, digito2;
            int resultado;
            int multiplicador;

            cpf = cpf.Trim();
            cpf = cpf.Replace(".", "").Replace("-", "");

            if (cpf.Length != 11)
            {
                return false;
            }

            switch (cpf)
            {
                case "00000000000":
                    return false;
                case "11111111111":
                    return false;
                case "22222222222":
                    return false;
                case "33333333333":
                    return false;
                case "44444444444":
                    return false;
                case "55555555555":
                    return false;
                case "66666666666":
                    return false;
                case "77777777777":
                    return false;
                case "88888888888":
                    return false;
                case "99999999999":
                    return false;
            }

            multiplicador = 10;
            for (int i = 0; i < 9; i++)
            {
                soma = soma + (Convert.ToInt32(cpf[i].ToString()) * multiplicador);
                multiplicador--;
            }

            resultado = soma % 11;

            if (resultado == 0 || resultado == 1)
                digito1 = 0;
            else
            {
                digito1 = 11 - resultado;
            }

            soma = 0;
            multiplicador = 11;
            for (int i = 0; i < 9; i++)
            {
                soma = soma + (Convert.ToInt32(cpf[i].ToString()) * multiplicador);
                multiplicador--;
            }

            soma += digito1 * 2;

            resultado = soma % 11;

            if (resultado == 0 || resultado == 1)
                digito2 = 0;
            else
            {
                digito2 = 11 - resultado;
            }

            if (cpf[9].ToString() == digito1.ToString() &&
                cpf[10].ToString() == digito2.ToString())
                return true;
            else
                return false;
        }
        public static string RemoveCaracte(string cpf)
        {
            return cpf.Trim().Replace(".", "").Replace("-", "");
        }
        public static string Formatar(string cpf)
        {
            return Convert.ToUInt64(cpf).ToString(@"000\.000\.000\-00");
        }
    }
}
