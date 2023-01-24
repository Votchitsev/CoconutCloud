import random
import string



def get_ext(file_name):
    return file_name.split('.')[-1]


def generate_storage_file_name(l, file_name):
    letters = string.ascii_lowercase
    random_string = ''.join(random.choice(letters) for i in range(l))
    random_string += f".{get_ext(file_name)}"
    
    return random_string
    