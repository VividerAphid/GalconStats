import urllib.request
import os
import time


def retrieve_files():
    print('Retrieving!')

    url = 'http://www.galcon.com/g2/logs/'
    files = ['GALAXY.txt', 'HITS.txt']
    path = '/media/PISERVERSTO/galaxyRawFiles/'
    gmFolder = 'GM-5-26-2020/'
    stamp = '1'

    urllib.request.urlretrieve(url + files[0], path + gmFolder + stamp + files[0])
    urllib.request.urlretrieve(url + files[1], path + gmFolder + stamp + files[1])

def prep_directory(parent, newDir):
    print('preparing new folder...')
    path = os.path.join(parent, newDir)
    try:  
        os.mkdir(path)  
    except OSError as error:  
        print(error)

prep_directory('/media/PISERVERSTO/galaxyRawFiles/GM-5-26-2020', '5-29-2020-1700')

time.sleep(20)
print('awake!')