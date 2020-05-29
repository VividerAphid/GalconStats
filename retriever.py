import urllib.request
import os
import time


def retrieve_files(gmFold, hourFold):
    print('Retrieving!')

    url = 'http://www.galcon.com/g2/logs/'
    files = ['GALAXY.txt', 'HITS.txt', 'FACTIONS.txt', 'CLANS.txt', 'LOGS.txt']
    path = '/media/PISERVERSTO/galaxyRawFiles/'

    urllib.request.urlretrieve(url + files[0], path + gmFold + hourFold + '/' + files[0])
    urllib.request.urlretrieve(url + files[1], path + gmFold + hourFold + '/' + files[1])
    urllib.request.urlretrieve(url + files[2], path + gmFold + hourFold + '/' + files[2])
    urllib.request.urlretrieve(url + files[3], path + gmFold + hourFold + '/' + files[3])
    urllib.request.urlretrieve(url + files[4], path + gmFold + hourFold + '/' + files[4])

def prep_directory(parent, newDir):
    print('preparing new folder...')
    path = os.path.join(parent, newDir)
    try:  
        os.mkdir(path)  
    except OSError as error:  
        print(error)

def prep_stamp():
    epoc = time.time()
    big = time.localtime(epoc)

    stamp = str(big.tm_mon) + '-' + str(big.tm_mday) + '-' + str(big.tm_year)+ '-' + str(big.tm_hour) + '00'

    return stamp
    
gm = 'GM-5-26-2020/'
baby = prep_stamp()
prep_directory('/media/PISERVERSTO/galaxyRawFiles/GM-5-26-2020', baby)
retrieve_files(gm, baby)

gm_running = True

while gm_running :
    sleep_time = 60 - time.localtime(time.time()).tm_min
    print('sleeping for ' + sleep_time + ' minutes. See you soon')
    time.sleep(sleep_time * 60)