import urllib.request

print('Retrieving?')

url='http://www.galcon.com/g2/logs/GALAXY.txt'

yes = "asdf"

urllib.request.urlretrieve(url, '/home/pi/Desktop/' + yes + 'galaxy.txt')
