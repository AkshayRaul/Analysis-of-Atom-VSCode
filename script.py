from pywinauto.application import Application
import datetime
import psutil

print(datetime.datetime.now())
print(psutil.cpu_percent())
print(psutil.virtual_memory())
app = Application().start("C:\\Users\\hp\\AppData\\Local\\atom\\atom.exe") #put exe of vs code here
app.wait_cpu_usage_lower(threshold=1)
#app.WindowSpecification.wait('ready', timeout=None).TypeKeys('%i')
print(datetime.datetime.now())
print(psutil.cpu_percent())
print(psutil.virtual_memory())