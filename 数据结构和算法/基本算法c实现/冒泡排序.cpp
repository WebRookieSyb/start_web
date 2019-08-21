#include<stdio.h>
void BubbleSort(int a[],int n)
{
	int i,j,t,tag=1;
	for(i=0;i<n-1&&tag;i++)
	{
		tag=0;
		for(j=n-1;j>i;j--)
		{
			if(a[j]<a[j-1])
			{
				t=a[j];
				a[j]=a[j-1];
				a[j-1]=t;
				tag=1;
			} 
		} 
	}
}
int main(void)
{
	int i;
	int a[8]={15,12,16,19,14,42,2,3};
	BubbleSort(a,8);
	for(i=0;i<8;i++)
		printf("%5d",a[i]);
	return 0;
	
} 
