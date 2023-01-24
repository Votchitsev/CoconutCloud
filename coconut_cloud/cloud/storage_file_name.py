from coconut_cloud.cloud.random_string import get_random_string


def get_ext(file_name):
    return file_name.split('.')[-1]


def generate_storage_file_name(l, file_name):
    result = get_random_string(l)
    result += f".{get_ext(file_name)}"
    
    return result
    