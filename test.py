import requests as re


entrada = {"V": 1090,
            "CVT": 682,
            "CF": 217,
            "CD": 87,
            "CD_m": 0.5,
            "DP": 2,
            "GF": 30,
            "TI": 0.1,
            "CPC": 251,
            "CPP": 196,
            "IV": 46,
            "V_ef": 0.1,
            "V_sc": 0.3,
            "V_in": 0.02,
            "VAR": -1,
            "GRO": 0.15,
            "GF_GRO": 0.05,
            "CV_ef": 0.03,
            "CD_ef": 0.05}
data = re.post('http://localhost:3000/api/stats', json=entrada)
print(data.text)
