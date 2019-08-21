#include<stdio.h>

void Quicksort(int a[],int low,int high){
	int i,j,t;
	if(high-low>1){
		i=low+1;
		j=high-1;
		while(i<=j){
			for(;i<high&&a[i]<a[low];i++);
			for(;j>low&&a[j]>=a[low];j--);
			if(i<j){
				t=a[i];
				a[i]=a[j];
				a[j]=t;	
			}
		}
		if(j>low)
		{
			t=a[low];
			a[low]=a[j];
			a[j]=t;
		}
		if(j>low)
			Quicksort(a,low,j);
		if(i<high)
			Quicksort(a,j+1,high);
	}
}
int main(void)
{
	int i;
	int a[8]={12,36,59,89,54,85,66,33};
	Quicksort(a,0,8);
	for(i=0;i<8;i++){
		printf("%3d",a[i]);
	}
	return 0;
}
