import urllib.request

print('Retrieving!')

url = 'http://www.galcon.com/g2/logs/'

targs = ['GALAXY.txt', 'HITS.txt']

stamp = "1"

urllib.request.urlretrieve(url + targs[0], '/media/PISERVERSTO/galaxyRawFiles/GM-5-26-2020' + stamp + targs[0])
urllib.request.urlretrieve(url + targs[1], '/media/PISERVERSTO/galaxyRawFiles/GM-5-26-2020' + stamp + targs[1])