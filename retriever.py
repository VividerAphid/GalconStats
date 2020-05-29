import urllib.request
import os
import time


def retrieve_files(gmFold, hourFold):
    print('Retrieving!')

    url = 'http://www.galcon.com/g2/logs/'
    files = ['GALAXY.txt', 'HITS.txt', 'FACTIONS.txt', 'CLANS.txt', 'LOGS.txt']
    path = '/media/PISERVERSTO/galaxyRawFiles/'
    path2 = '/media/PISERVERSTO/serv/'

    urllib.request.urlretrieve(url + files[0], path + gmFold + hourFold + '/' + files[0])
    urllib.request.urlretrieve(url + files[1], path + gmFold + hourFold + '/' + files[1])
    urllib.request.urlretrieve(url + files[2], path + gmFold + hourFold + '/' + files[2])
    urllib.request.urlretrieve(url + files[3], path + gmFold + hourFold + '/' + files[3])
    urllib.request.urlretrieve(url + files[4], path + gmFold + hourFold + '/' + files[4])

    urllib.request.urlretrieve(url + files[0], path2 + files[0])
    urllib.request.urlretrieve(url + files[1], path2 + files[1])
    urllib.request.urlretrieve(url + files[2], path2 + files[2])
    urllib.request.urlretrieve(url + files[3], path2 + files[3])
    urllib.request.urlretrieve(url + files[4], path2 + files[4])

def prep_directory(parent, newDir):
    print('preparing new folder...')
    path = os.path.join(parent, newDir)
    try:  
        os.mkdir(path)  
    except OSError as error:  
        print(error)

def prep_stamp(style):
    epoc = time.time()
    big = time.localtime(epoc)

    if style == 0:
        return str(big.tm_mon) + '-' + str(big.tm_mday) + '-' + str(big.tm_year)
    elif style == 1:
        return str(big.tm_hour) + '00'
    else:
        return str(big.tm_mon) + '-' + str(big.tm_mday) + '-' + str(big.tm_year)+ '-' + str(big.tm_hour) + '00'
    
gm = 'GM-5-26-2020/'
baby = prep_stamp(0)
prep_directory('/media/PISERVERSTO/galaxyRawFiles/GM-5-26-2020', baby)
baby2 = prep_stamp(1)
prep_directory('/media/PISERVERSTO/galaxyRawFiles/GM-5-26-2020/' + baby , baby2)
retrieve_files(gm + baby + '/', baby2)

gm_running = True
last_modified = urllib.request.urlopen('http://www.galcon.com/g2/logs/GALAXY.txt', timeout=30).headers['last-modified']

while gm_running :

    print(last_modified)

    sleep_time = 60 - time.localtime(time.time()).tm_min
    print('Sleeping for ' + str(sleep_time) + ' minutes. See you soon')
    time.sleep(sleep_time * 60)