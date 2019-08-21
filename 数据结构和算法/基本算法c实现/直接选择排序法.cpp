//时间复杂度:O(n^2)
//稳定性:不稳定 
#include<stdio.h>
void SelectedSort(int a[],int n)
{
	int i,j,kmin,t;
	for(i=0;i<n-1;i++)
	{
		kmin=i;
		for(j=i+1;j<n;j++)
			if(a[j]<a[kmin])
				kmin=j;
		if(i-kmin)
		{
			t=a[kmin];
			a[kmin]=a[i];
			a[i]=t;
		}
	}
}
int main(void)
{
	int a[8]={3,2,5,8,4,7,6,9};
	int i;
	SelectedSort(a,8);
	for(i=0;i<8;i++)
		printf("%5d",a[i]);
	return 0; 
}
