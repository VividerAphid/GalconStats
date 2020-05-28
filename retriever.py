import urllib.request

print('Retrieving!')

url = 'http://www.galcon.com/g2/logs/'
files = ['GALAXY.txt', 'HITS.txt']
path = '/media/PISERVERSTO/galaxyRawFiles/'
gmFolder = 'GM-5-26-2020/'
stamp = '1'

urllib.request.urlretrieve(url + files[0], path + gmFolder + stamp + files[0])
urllib.request.urlretrieve(url + files[1], path + gmFolder + stamp + files[1])