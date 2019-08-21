//时间复杂度：O(n^2)
//稳定性：稳定 
#include<stdio.h>
void InsertSort(int a[],int n)
{
	int i,j,x;
	int d=8;
	while(d>1)
	{
	for(i=1;i<n;i++)
	{
		x=a[i];
		for(j=i-1;j>-1&&a[j]>x;a[j+1]=a[j],j--);
		a[j+1]=x;
	}
}
}
int main(void)
{
	int a[8]={3,2,5,8,4,7,6,9};
	int i;
	InsertSort(a,8);
	for(i=0;i<8;i++)
		printf("%5d",a[i]);
	return 0;
}
