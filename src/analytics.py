import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

def issues(inputFile):
	frame = pd.read_json(inputFile+'.json')
	newFrame = pd.DataFrame()
	issueId = frame['id']
	issueCreatedDate = []
	issueCreated = frame['created_at']
	for allDates in issueCreated:
		issueCreatedDate.append(str(str(allDates).split(' ')[0]).split('-'))
	listOfDates = {}
	for allDates in issueCreatedDate:
		if(str(allDates[1]+'/'+allDates[0]) in listOfDates):
			listOfDates [allDates[1]+'/'+allDates[0]] += 1
		else:
			listOfDates [allDates[1]+'/'+allDates[0]] = 0
	
	newFrame['id'] = issueId
	newFrame['created_at'] = issueCreated
	newFrame['comments'] = numberOfComments
	newFrame.to_csv(inputFile+'.csv', index=False)

	return listOfDates


def totalIssues():
	#OPEN = 0
	#CLOSED = 1
	atomIssues = [609, 13522]
	vsIssues = [4349, 54974]

	fig, ax = plt.subplots(figsize=(20,10))
	ax.barh([1, 3], atomIssues, align='center', color='Skyblue' , label='Atom')
	ax.barh([2, 4], vsIssues, align='center', color='IndianRed', label='VS Code')

	ax.set_yticks([1.5, 3.5])
	ax.set_yticklabels(['Open Issues', 'Closed Issues'], minor=False)

	ax.text(atomIssues[0] + 1000, 1, atomIssues[0], color='black')
	ax.text(vsIssues[0]+ 1000, 2, vsIssues[0], color='black')
	ax.text(atomIssues[1]+ 1000, 3, atomIssues[1], color='black')
	ax.text(vsIssues[1]+ 450, 4, vsIssues[1], color='black')

	ax.set_xlabel('Number Of Issues')
	ax.legend(loc='lower right')
	ax.set_title('Analysis Of Issues')
	plt.savefig('Analysis Of Issues(Total).png')

def visualizeIssues(listOfDates, listOfDates2, status):
	width = 0.35	
	fig, ax = plt.subplots(figsize=(20,10))
	p1 = ax.bar(np.arange(len(listOfDates)) - width/2, listOfDates.values(), width, color='IndianRed', label='VS Code')
	p2 = ax.bar(np.arange(len(listOfDates2)) + width/2, listOfDates2.values(), width, color='Skyblue', label='Atom')
	ax.set_ylabel('Number of Issues')
	ax.set_xlabel('TimeLine')
	ax.set_title('Number of Issues per Month')
	ax.set_xticks(np.arange(len(listOfDates2)))
	ax.legend(loc='upper right')
	ax.set_xticklabels(listOfDates2.keys(), rotation='vertical',  minor=False)
	plt.savefig('Analysis Of '+status+' Issues(Monthly).png')

def visualizeContributors(listOfDates, listOfDates2):
	width = 0.35	
	fig, ax = plt.subplots(figsize=(20,10))
	p1 = ax.bar(np.arange(len(listOfDates)) - width/2, listOfDates, width, color='IndianRed', label='VS Code')
	p2 = ax.bar(np.arange(len(listOfDates2)) + width/2, listOfDates2, width, color='Skyblue', label='Atom')
	ax.set_ylabel('Number of Contributions')
	ax.set_xlabel('Contributors')
	ax.set_title('Top 30 contributors')
	ax.set_xticks(np.arange(len(listOfDates2)))
	ax.legend(loc='upper right')
	ax.set_xticklabels(np.arange(1, len(listOfDates)+1), minor=False)
	plt.savefig('Analysis Of Contributors.png')		

def closedIssues(inputFile):
	frame = open(inputFile+'.json', 'r+')
	issueClosed = frame['closed_at']
	issueClosedDate = []
	for allDates in issueClosed:
		issueClosedDate.append(str(str(allDates).split(' ')[0]).split('-'))
	listOfDatesClosed = {}
	for allDates in issueClosedDate:
		if(allDates!=None):
			if(str(allDates[1]+'/'+allDates[0]) in listOfDatesClosed):
				listOfDatesClosed [allDates[1]+'/'+allDates[0]] += 1
			else:
				listOfDatesClosed [allDates[1]+'/'+allDates[0]] = 0
	numberOfComments = frame['comments']
	openInterval = []
	for created,closed in zip(issueCreated, issueClosed):
		if(closed==None):
			openIntervalItem = -1
		else:
			openIntervalItem = closed - created
		openInterval.append(openIntervalItem)

def contributors(inputFile):
	frame = pd.read_json(inputFile+'.json')
	newFrame = pd.DataFrame()
	contributorsCountName = frame['login'].values.tolist()
	contributorsCount = frame['contributions'].values.tolist()
	return contributorsCount, contributorsCountName

def calculateFactor(contributors, totalCommits):
	threshold = totalCommits/2
	count = 0
	while (totalCommits>=threshold):
		totalCommits -=contributors[count]
		count+=1
	return count	

inputFile = 'vscodeIssuesData'
listOfDates, listOfDatesClosed = issues(inputFile)
inputFile = 'atomIssuesData'
totalIssues()
visualizeIssues(listOfDates, listOfDates2, 'Open')

#Contributor Details and Plots
vscodeContributors, vscodeContributorsName = contributors('vscodeContributors')
atomContributors, atomContributorsName = contributors('atomContributors')
visualizeContributors(vscodeContributors, atomContributors)

vscodeTotalCommits = 42995
atomTotalCommits = 35857

vscodeFactor = calculateFactor(vscodeContributors,vscodeTotalCommits)
atomFactor = calculateFactor(atomContributors, atomTotalCommits)

vscodeContributionShare = [share/vscodeTotalCommits for share in vscodeContributors[0:vscodeFactor] ]
atomContributionShare = [share/atomTotalCommits for share in atomContributors[0:atomFactor] ]